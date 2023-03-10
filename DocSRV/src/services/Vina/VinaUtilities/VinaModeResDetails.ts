import { LOGGER } from "../../../utilities/Logging";

/**
* VinaModeResDetails is a class that represents a single mode generated by the Vina command execution.
* @class VinaModeResDetails
* @property {number} mode - The mode number.
* @property {number} affinity - The affinity of the mode.
* @property {number} rsmd_lb - The RMSD (Root Mean Square Deviation) lower bound of the mode.
* @property {number} rsmd_ub - The RMSD upper bound of the mode.
*/
class VinaModeResDetails {
    mode: number | undefined;
    affinity: number | undefined;
    rsmd_lb: number | undefined;
    rsmd_ub: number | undefined;
    /** 
    * @constructor - The constructor initializes an empty instance of the class.
    */
    constructor() { }

    static fromJSON(json:any){
        let toret = new VinaModeResDetails();
        toret.mode = json.mode;
        toret.affinity = json.affinity;
        toret.rsmd_lb = json.rsmd_lb;
        toret.rsmd_ub = json.rsmd_ub;
        return toret;
    }
    /** 
    * @method parseLineAndInit - A method that parses a line of text that represents a mode,
    * and initializes the properties of the class based on the values in the line.
    * @param {string} line - The line of text that represents the mode.
    * @return {VinaModeResDetails} - An instance of the class containing the parsed values, or undefined if the parsing failed.
    */
    parseLineAndInit(line:string) {
        let coords = line.trim().split(' ').filter(out => out.trim() != '');
        if (coords.length != 4) {
            LOGGER.error({
                message: JSON.stringify("Cant parse a VinaModeResDetails from the following line :" + line),
                className: this.constructor.name
            })
            return undefined;
        }
        this.mode = parseFloat(coords[0]);
        this.affinity = parseFloat(coords[1]);
        this.rsmd_lb = parseFloat(coords[2]);
        this.rsmd_ub = parseFloat(coords[3]);
        return this;
    }
}

export { VinaModeResDetails }