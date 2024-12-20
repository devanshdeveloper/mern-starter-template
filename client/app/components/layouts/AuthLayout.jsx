import React from "react"
import { Outlet } from "react-router"

import useBodyAttributes from "../../hooks/useBodyAttributes"
import { AuthBannerImage } from "../../constants/svg-imports"

function AuthLayout() {
  useBodyAttributes({
    class: "h-screen overflow-hidden",
  })

  return (
    <div className="flex h-screen p-5">
      <AuthBannerImage className="h-full hidden lg:inline-block" />
      {/* <img src="/assets/svgs/auth-page-banner.svg" className="inline-block" alt="auth-page-banner" /> */}
      <div className="flex flex-col w-full mx-auto lg:w-1/2 p-10 overflow-x-scroll hidden-scrollbar">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
