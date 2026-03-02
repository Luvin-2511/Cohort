/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = {}
    for(let str of strs){
        let firstStr = str.split("").sort().join("")
        if(!map[firstStr]) map[firstStr]=[]
        map[firstStr].push(str)
    }
    return Object.values(map)
};