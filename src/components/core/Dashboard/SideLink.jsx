import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SideLink = ({ link, iconName }) => {

  const Icon = Icons[iconName] || Icons.VscQuestion; // Fallback icon
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route, exact: true }, location.pathname); // Exact match
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}
    >
      {/* Highlight bar */}
      <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}> {/* Corrected opacity */}
      </span>

      {/* Icon and Link Name */}
      <div className='flex items-center gap-x-2'> {/* Corrected class 'items-center' */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SideLink;
