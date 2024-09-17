/**
 * Extracts the public ID from a URL.
 * 
 * @param {string} url - The URL from which to extract the public ID.
 * @returns {string|null} - The extracted public ID, or null if no match is found.
 */
const extractPublicId = (url) => {
    // things to match
    const regex = /\/v\d+\/(.*?)(?:\.\w+)?$/;
    // utilize the match
    const match = url.match(regex);
    return match ? match[1] : null;
};

module.exports = extractPublicId;