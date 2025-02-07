import React from "react";

const ResetPassword = () => {
   return (
      <div>
         <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
               <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
               <form className="space-y-4">
                  <div className="space-y-2">
                     <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Password
                     </label>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;
