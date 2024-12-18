import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/Authapis";
import { useDispatch, useSelector } from "react-redux";
import SideLink from "./SideLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import Confirmationmodal from "../../common/Confirmationmodal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }

  return (
    <div className="text-white fixed mt-[3rem]">
      <div
        className="flex min-w-[222px] flex-col h-screen 
        border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10
        md:relative md:w-full"
      >
        {/* Sidebar Links */}
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SideLink key={link.id} link={link} iconName={link.icon} />;
          })}
        </div>

        {/* Divider */}
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        {/* Settings and Logout */}
        <div className="flex flex-col">
          <SideLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex ml-8 mt-3 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <Confirmationmodal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
