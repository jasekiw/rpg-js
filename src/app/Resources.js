/**
 * Resources Static Class
 */
var Resources = {
    imgDir: "assets/img/",
    grass: "assets/img/background/grass.png",
    /**
     * gets a skeleton sprite sheet by the id
     * @param {string} id the id of the current sprite sheet
     * @returns {string} the designated skeleton sprite sheet
     */
    getSkeleton: function (id) {
        return Resources.imgDir + "skeleton-sprite-sheet/skeleton_" + id + ".png"
    },
    /**
     * gets a character sprite sheet by the id
     * @param {string} id the id of the current sprite sheet
     * @returns {string} the designated character sprite sheet
     */
    getCharacter: function (id) {
        return Resources.imgDir + "character-sprite-sheet/character-spritesheet_" + id + ".gif"
    }
};
