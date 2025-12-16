import type { Response } from "express";


interface authTokens {
    accessToken?: string,
    refreshToken?: string
};


// SET COOKIE FUNCTION
export const setAuthCookie = (res: Response, tokenInfo: authTokens) => {

    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    };


    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
    };
};