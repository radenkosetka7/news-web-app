export const API_URL = process.env.REACT_APP_API_URL;
export const formatString = (str) => {
    return str?.trim().replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '')
        .toLowerCase();
};

const base64UrlDecode = (str) => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    switch (str.length % 4) {
        case 2:
            str += '==';
            break;
        case 3:
            str += '=';
            break;
    }

    return atob(str);
}

export const decodeJwt = (token) => {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }

    const payload = base64UrlDecode(parts[1]);

    return JSON.parse(payload);
}

export const getOsName = (name) => {
    let os = "Unknown OS";

    if (name.indexOf("Win") !== -1) {
        os = "Windows";
    } else if (name.indexOf("Mac") !== -1) {
        os = "Mac OS";
    } else if (name.indexOf("Linux") !== -1) {
        os = "Linux";
    } else if (name.indexOf("Android") !== -1) {
        os = "Android";
    } else if (name.indexOf("like Mac") !== -1) {
        os = "iOS";
    }
    return os;
}
export const getBrowserName = (name) => {
    let browserName = "Unknown Browser";

    if (name.indexOf("Chrome") !== -1) {
        browserName = "Chrome";
    } else if (name.indexOf("Safari") !== -1) {
        browserName = "Safari";
    } else if (name.indexOf("Firefox") !== -1) {
        browserName = "Firefox";
    } else if (name.indexOf("MSIE") !== -1 || name.indexOf("Trident") !== -1) {
        browserName = "Internet Explorer";
    } else if (name.indexOf("Edge") !== -1) {
        browserName = "Edge";
    }

    return browserName;
}

