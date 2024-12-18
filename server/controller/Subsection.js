const SubSection = require('../model/SubSection');
const Section = require('../model/Section');
const {uploadImageToCloudinary} = require('../utils/cloudinary');


exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log(video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }



  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

exports.deleteSubSection = async(req, res) =>{
    try {
        const{sectionId, subSectionId} = req.body;
       
        if(!sectionId || !subSectionId){
            return res.status(400).json({
                success:false,
                message: "Empty details, Please fill all the details",
            });
        }

        await Section.findByIdAndUpdate(sectionId,
            {
                $pull:{
                   subSection : subSectionId,
                }
            }
        )

        await SubSection.findByIdAndDelete(sectionId);

        const updateSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success:true,
            data:updateSection,
            message:"SubSection deleted Successfully",
        });

    } catch (error) {
         console.log(error);
        res.status(500).json({
        success:false,
        message:"Something went wrong while deleting Subsection",
      });
    }
}