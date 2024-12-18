const Category = require('../model/Category');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async(req, res) =>{
    try {
        
        const {name, description} = req.body;

        if(!name || !description){
            res.status(400).json({
                success:false,
                message: "Please fill all the details",
            });
        }

        const tagCreation = await Category.create({
            name:name,
            description:description,
        });
        console.log(tagCreation);
         
        return res.status(200).json({
            success:true,
            message:"Tag Created successfully",
        });



    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message: "Something went wrong while creating tag ",
        });
    }
}



exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
        console.log("categorie", allCategorys)
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        console.log("Received Category ID:", categoryId);

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        // Fetch the selected category and populate courses with instructor details
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "course", 
                populate: { path: "instructor", model: "User" }, // Ensure the model is correct
            })
            .exec();

        if (!selectedCategory) {
            console.log("Category not found for ID:", categoryId);
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        console.log("Selected Category and its courses:", selectedCategory);

        if (!selectedCategory.course || selectedCategory.course.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        // Fetch suggested courses from other categories
        const suggestedCourses = await Category.find({ _id: { $ne: categoryId } })
            .populate({
                path: "course",
                populate: { path: "instructor", model: "User" },
            })
            .exec();

        console.log("Suggested courses:", suggestedCourses);

        // Fetch other category's courses as additional suggestions
        const otherCategories = await Category.find({ _id: { $ne: categoryId } });
        const randomCategory = otherCategories[Math.floor(Math.random() * otherCategories.length)];
        
        const differentCategory = await Category.findById(randomCategory._id)
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: { path: "instructor", model: "User" },
            })
            .exec();

        console.log("Suggested different category:", differentCategory);

        // Sort all courses across categories by best-sellers
        const allCategories = await Category.find()
            .populate({
                path: "course",
                match: { status: "Published" },
                populate: { path: "instructor", model: "User" },
            })
            .exec();

        const allCourses = allCategories.flatMap((category) => category.course);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        console.log("Most selling courses:", mostSellingCourses);

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: {
                selectedCategory,
                suggestedCourses,
                differentCategory,
                mostSellingCourses,
            },
        });
    } catch (error) {
        console.error("Error fetching category page details:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching categorized course",
        });
    }
};



