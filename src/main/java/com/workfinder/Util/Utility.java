package com.workfinder.Util;

import jakarta.servlet.http.HttpServletRequest;

public class Utility {
    public static String servetRequest(HttpServletRequest request){
        String siteUrl = request.getRequestURL().toString();
        return  siteUrl.replace(request.getServletPath(),"");
    }
}
