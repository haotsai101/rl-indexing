
/*======================================================================================================
[][][][]/
[][][][]    Licensure
[][][][]\

Although this SDK does not directly include any code from the "Lite JS SDK for the FamilySearch API"
github project (https://github.com/FamilySearch/fs-js-lite), it is designed to be compatible therewith.
As such, we will post their MIT licensure statement here, noting that the code in this project is
the exclusive property of Brigam Young University, and was developed by student researchers in the
BYU Family History Technology Lab as an extension to the aformentioned project.

Lite JS SDK for the FamilySearch API License:
--------------------------------------------------------------------------------
MIT License

Copyright (c) 2016 York Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
--------------------------------------------------------------------------------


======================================================================================================*/

/*=============================================================================================
[][][][]/
[][][][]    FamilySearch Definitions
[][][][]\
=============================================================================================*/
// #region FS Definitions


type FSHeaders = {[k:string]: string |  number};
type HTTPMethod = "GET" | "PUT" | "POST" | "DELETE";
type Handler = (error: any, response: any) => void;
type Callback = () => void;
type FSEnvironment = "production" | "beta" | "integration";
type PID = string;

class FSLink{
    href: string;
    offset?: number;
    template?: string;
    title?: string;
    type?: string;
    accept?: string;
    allow?: string;
    hreflang?: string;
}

class FSResourceReference{
    resourceId: string;
    resource: string;
}

class FSExtensibleData{
    id: string;
}

class FSHypermediaEnabledData extends FSExtensibleData{
    links: {[k:string]: FSLink} = {};
}

class FSFamilyView extends FSHypermediaEnabledData{
    parent1: FSResourceReference;
    parent2: FSResourceReference;
    children?: FSResourceReference[] = [];
}

class FSAttribution extends FSExtensibleData{
    contributor: FSResourceReference;
    modified: number;
    changeMessage: string;
    creator: FSResourceReference;
    created: number;
}

class FSQualifier{
    name: string;
    value: string;
}

class FSSourceReference extends FSHypermediaEnabledData{
    attribution: FSAttribution;
    description: string;
    descriptionID: string;
    qualifiers: FSQualifier[] = [];
}

class FSNote extends FSHypermediaEnabledData{
    lang: string;
    subject: string;
    text: string;
    attribution: FSAttribution;
}

class FSConclusion extends FSHypermediaEnabledData{
    sortKey: string;
    attribution: FSAttribution;
    sources: FSSourceReference[];
    analysis: FSResourceReference;
    notes: FSNote[] = [];
}

class FSGender extends FSConclusion{
    type: string;
}

class FSTextValue{
    lang: string;
    value: string;
}

class FSDate extends FSExtensibleData{
    normalized: FSTextValue[] = [];
    original: string;
    formal: string;
}

class FSNamePart extends FSExtensibleData{
    type: string;
    value: string;
    qualifiers: FSQualifier[] = [];
}

class FSNameForm extends FSExtensibleData{
    lang: string;
    fullText: string;
    parts: FSNamePart[] = [];
}

class FSName extends FSConclusion{
    type: string;
    preferred: boolean;
    date: FSDate;
    nameForms: FSNameForm[] = [];
}

class FSPlaceReference extends FSExtensibleData{
    normalized: FSTextValue[] = [];
    original: string;
}

class FSFact extends FSConclusion{
    type: string;
    date: FSDate;
    place: FSPlaceReference;
    value: string;
    qualifiers: FSQualifier[] = [];
}

class FSDisplayProperties extends FSExtensibleData{
    name: string;
    gender: string;
    lifespan: string;
    birthDate: string;
    birthPlace: string;
    deathDate: string;
    deathPlace: string;
    marriageDate: string;
    marriagePlace: string;
    ascendancyNumber: string;
    descendancyNumber: string;
    familiesAsParent: FSFamilyView[] = [];
    familiesAsChild: FSFamilyView[] = [];
}

class FSEvidenceReference extends FSHypermediaEnabledData{
    resourceId: string;
    resource: string;
    attribution: FSAttribution;
}

class FSSubject extends FSConclusion{
    extracted: boolean;
    evidence: FSEvidenceReference[] = [];
    media: FSSourceReference[] = [];
    identifiers: {[k:string]: string} = {};
}

class FSPerson extends FSSubject{
    display: FSDisplayProperties;
    private: boolean;
    living: boolean;
    gender: FSGender;
    names: FSName[] = [];
    facts: FSFact[] = [];
}

class FSRelationship extends FSSubject{
    type: string;
    person1: FSResourceReference;
    person2: FSResourceReference;
    facts: FSFact[] = [];
}

class FSChildAndParentRelationship extends FSSubject{
    father: FSResourceReference;
    mother: FSResourceReference;
    child: FSResourceReference
    fatherFacts: FSFact[] = [];
    motherFacts: FSFact[] = [];
}

class FSUser extends FSExtensibleData{
    contactName: string;
    helperAccessPin: string;
    fullName?: string;
    givenName: string;
    familyName: string;
    email: string;
    alternateEmail: string;
    country: string;
    gender: "MALE" | "FEMALE" | "UNKNOWN";
    birthDate: string;
    phoneNumber?: string;
    mobilePhoneNumber?: string;
    mailingAddress?: string
    perferredLanguage?: string;
    displayName: string;
    personId: PID;
    treeUserId: string;
    links: {[k:string]: FSLink} = {};
}

type FSRequestOpt = {
    method?: HTTPMethod,
    headers?: FSHeaders,
    body?: string | object,
}

type FSResponse = {
    statusCode: number,
    statusText: string,
    headers: FSHeaders,
    body: string,
    data?: any,
    originalUrl: string,
    effectiveUrl: string,
    requestMethod: string,
    requestHeaders: FSHeaders,
    redirected: boolean,
    throttled: boolean,
    retries: number,
}

export type FSInitOptions = {
    environment: FSEnvironment,
    appKey: string,
    redirectUri: string,
    accessToken?: string,
    saveAccessToken?: boolean,
    tokenCookie?: string,
    tokenCookiePath?: string,
    maxThrottledRetries?: number,
    pendingModifications?: string[],
    requestInterval?: number,
}

export declare class FamilySearch{
    constructor(initOptions?: FSInitOptions);
    config(initOptions?: FSInitOptions): void;

    /*
     * REQUEST METHODS
     */
    get(url: string, handler: Handler): void;
    post(url: string, options: FSRequestOpt, handler: Handler): void;
    head(url: string, handler: Handler): void;
    delete(url: string, handler: Handler): void;
    get(url: string, options: FSRequestOpt, handler: Handler): void;
    request(url: string, options: FSRequestOpt, handler: Handler): void;
    request(url: string, handler: Handler): void;

    /*
     * AUTHENTICATION
     */
    oauthRedirectURL(state?: any): void;
    oauthRedirect(state?: any): void;
    oauthToken(code: any, callback: Handler): void;
    oauthUnauthenticatedToken(ipAddress: string, callback: Handler): void;
    oauthResponse(callback: Handler): void;
    oauthResponse(state: any[], callback: Handler): void;
    oauthPassword(username: string, password: string, callback: Handler): void;
    setAccessToken(accessToken: string): void;
    getAccessToken(): void;
    deleteAccessToken(): void;

    /*
     * MIDDLEWARE
     */
    addRequestMiddleware(middleware: (client: any, request: object, next: Function) => void): void;
    addRequestMiddleware(middleware: (client: any, request: object, response: object, next: Function) => void): void;
}

// #endregion


/*=============================================================================================
[][][][]/
[][][][]    FamilySearchX Definition
[][][][]\
=============================================================================================*/
// #region FSX Definition
export class FamilySearchX extends FamilySearch{

    /*=============================================================================================
    [][][][]/
    [][][][]    Init & Utils
    [][][][]\
    =============================================================================================*/
    // #region Init and Utils

    /**
     * This method is designed principally as a means of loading up a configuration file.
     * @param uri 
     * @param handler 
     */
    public static uploadConfig(uri: string, handler: (options: FSInitOptions) => void, errorHandler: Function){

        let request = new XMLHttpRequest();
        request.addEventListener("load", function(){
            let data = this.response;
            if(data instanceof String){
                handler(JSON.parse(data as string));
            }
            else{
                handler(data);
            }
        });
        request.addEventListener("error", function(){
            errorHandler(this.response);
        });
        request.open("GET", uri);
        request.responseType = "json";
        request.send();
    }

    public userPID: string;

    constructor(options: FSInitOptions){
        super(options);
        this.userPID = "";
    }

    public logout(handler: Handler){
        this.post("/platform/logout", {}, (error: any, response: FSResponse) => {
            console.log("%c User has been logged out", "color: #ffdd00");
            handler && handler(error, response);
        });
    }

    public isPID(field: PID | string): field is PID{
        return !!(/[a-zA-Z0-9]{4}-[a-zA-Z0-9]{3}/g).exec(field);
    }

    // #endregion

    /*=============================================================================================
    [][][][]/
    [][][][]    User API
    [][][][]\
    =============================================================================================*/
    // #region User API

    /**
     * Gets the current user person
     * @param handler 
     */
    public getCurrentTreePerson(handler: Handler): void{
        this.get('/platform/tree/current-person', handler);
    }

    /**
     * Gets the information for the current user.
     * @param handler 
     */
    public getCurrentUser(handler: (error: any, user: FSUser) => void): void{
        this.get('/platform/users/current', (error, response) => {
            try{
                if(!error){
                    let res: {users: FSUser[]} = (JSON.parse(response.body));
                    let user = res.users[0];
                    this.userPID = user.personId;
                    handler(error, user);
                }
            }
            catch(e){
                handler({apiError: error, parsingError:e}, null);
            }

        });
    }

    /**
     * Gets a FamilySearch person information for a user.
     * @param user 
     * @param handler 
     */
    public getPersonFromUser(user: FSUser, handler: Handler): void{
        if(!!user.links && !!user.links.person){
            this.get(user.links.person.href, handler);
        }
        else{
            this.get("/platform/tree/persons/" + user.personId, handler);
        }
    }

    /**
     * Gets the user's ancestry and returns the RAW results.
     * @param handler 
     * @param generations 
     * @param spouse 
     * @param marriageDetails 
     * @param descendants 
     * @param personDetails 
     */
    public getUserWithAncestry(handler: Handler, generations: number = 8, spouse: string = "", marriageDetails: boolean, descendants: boolean, personDetails: boolean): void{
        if(!this.userPID){
            this.getCurrentUser((error: any, user:FSUser) => {
                this.getUserWithAncestry(handler, generations, spouse, marriageDetails, descendants, personDetails);
            });
            return;
        }
        else{
            this.getPersonWithAncestry(this.userPID, handler, generations, spouse, marriageDetails, descendants, personDetails);
        }
    }

    /**
     * Gets the user's descendancy and returns the RAW results.
     * @param handler 
     * @param generations 
     * @param spouse 
     * @param marriageDetails
     * @param personDetails 
     */
    public getUserWithDescendancy(handler: Handler, generations: number = 2, spouse: string = "", marriageDetails: boolean, personDetails: boolean): void{
        if(!this.userPID){
            this.getCurrentUser((error: any, user:FSUser) => {
                this.getUserWithDescendancy(handler, generations, spouse, marriageDetails, personDetails);
            });
            return;
        }
        else{
            this.getPersonWithDescendancy(this.userPID, handler, generations, spouse, marriageDetails, personDetails);
        }
    }

    // #endregion

    /*=============================================================================================
    [][][][]/
    [][][][]    Person API
    [][][][]\
    =============================================================================================*/
    // #region Person API

    /**
     * Get a particular person's data from the family tree
     * @param pid 
     * @param handler 
     * @param relatives (Optional) boolean whether or not relatives should be included with the results. Defaults to false
     * @param sourceDescriptions (Optional) boolean whether or not sourceDescriptions should be included with the results. Defaults to false
     */
    public getPerson(pid: PID, handler: Handler, relatives: boolean = false, sourceDescriptions: boolean = false): void{
        let uri: string = '/platform/tree/persons/' + pid;
        let params: string[] = [];
        if(relatives){
            params.push("relatives=true");
        }
        if(sourceDescriptions){
            params.push("sourceDescriptions=true");
        }
        if(params.length){
            uri += "?" + params.join("&");
        }
        this.get(uri, handler);
    }

    /**
     * Get the data for a collection of people.
     * @param pids 
     * @param handler 
     */
    public getPersons(pids: PID[], handler: Handler): void{
        const limit: number = 500;
        
        // Handle inproperly sized requests.
        if(pids.length > limit){
            console.error("getPersons() called to FS with", pids.length, "ids. The limit is", limit, ".");
            pids = pids.slice(0,limit);
        }

        const list: string = pids.reduce((curr: string, pid: PID) => 
            curr += (pid + ",")
        , "").substr(0, -1);

        // Final API call
        this.get('/platform/tree/persons?pids=' + list, handler)
    }

    /**
     * Gets a person with their ancestry and returns the RAW results.
     * @param pid 
     * @param handler 
     * @param generations 
     * @param spouse 
     * @param marriageDetails 
     * @param descendants 
     * @param personDetails 
     */
    public getPersonWithAncestry(pid: PID, handler: Handler, generations: number = 2, spouse: string = "", marriageDetails: boolean, descendants: boolean, personDetails: boolean): void{
        const maxGenerations: number = 8;
        
        const baseUri = "/platform/tree/ancestry?person=" + pid;
        
        let uri = baseUri;

        if(generations > 0){
            if(generations > maxGenerations){
                console.error("getPersonWithDescendancy() requested", generations, "generations. The limit is", maxGenerations, ".");
                generations = maxGenerations;
            }
            uri += "&generations=" + generations;
        }

        if(spouse != ""){
            uri += "&spouse=" + spouse;
        }

        if(marriageDetails){
            uri += "&marriageDetails=true";
        }

        if(personDetails){
            uri += "&personDetails=true";
        }

        if(descendants){
            uri += "&descendants=true";
        }

        console.log(uri);
        this.get(uri, handler);
    }

    /**
     * Gets a person with their descendancy and returns the RAW results.
     * @param pid 
     * @param handler 
     * @param generations 
     * @param spouse 
     * @param marriageDetails 
     * @param personDetails 
     */
    public getPersonWithDescendancy(pid: PID, handler: Handler, generations: number = 2, spouse: string = "", marriageDetails: boolean, personDetails: boolean): void{
        const maxGenerations: number = 2;
        
        const baseUri = "/platform/tree/descendancy?person=" + pid;
        
        let uri = baseUri;

        if(generations > 0){
            if(generations > maxGenerations){
                console.error("getPersonWithDescendancy() requested", generations, "generations. The limit is", maxGenerations, ".");
                generations = maxGenerations;
            }
            uri += "&generations=" + generations;
        }

        if(spouse != ""){
            uri += "&spouse=" + spouse;
        }

        if(marriageDetails){
            uri += "&marriageDetails=true";
        }

        if(personDetails){
            uri += "&personDetails=true";
        }

        this.get(uri, handler);
    }

    /**
     * Gets a person with their ancestry and returns the processed results.
     * @param pid 
     * @param handler 
     * @param generations 
     * @param spouse 
     * @param marriageDetails 
     * @param personDetails 
     */
    public getPersonAncestry(pid: PID, handler: (error: any, data: FSPerson[]) => void, generations: number): void{
        let desc = new FSXAncestryBuilder(this, pid, generations);
        // console.log("Running ancestry!");
        desc.run().then((res) => {
            // console.log("Ancestry Data:", res);
            handler(null, res.people);
        }, (rej) => {
            console.log("Ancestry Failed:", rej);
            handler(rej, []);
        })
    }

    /**
     * Gets a person with their descendancy and returns the processed results.
     * @param pid 
     * @param handler 
     * @param generations 
     * @param spouse 
     * @param marriageDetails 
     * @param personDetails 
     */
    public getPersonDescendancy(pid: PID, handler: (error: any, data: FSPerson[]) => void, generations: number): void{
        let desc = new FSXDescendancyBuilder(this, pid, generations);
        // console.log("Running descendancy!");
        desc.run().then((res) => {
            // console.log("Descendancy Data:", res);
            handler(null, res.people);
        }, (rej) => {
            console.log("Descendancy Failed:", rej);
            handler(rej, []);
        })
    }

    /**
     * Gets a person's parents.
     * @param pid 
     * @param handler 
     */
    public getPersonWithParents(pid: PID, handler: Handler): void{
        this.get("/platform/tree/persons/" + pid + "/parents", handler);
    }

    /**
     * Gets a person's spouses.
     * @param pid 
     * @param handler 
     */
    public getPersonWithSpouses(pid: PID, handler: Handler): void{
        this.get("/platform/tree/persons/" + pid + "/spouses", handler);
    }

    /**
     * Gets a person's children.
     * @param pid 
     * @param handler 
     */
    public getPersonWithChildren(pid: PID, handler: Handler): void{
        this.get("/platform/tree/persons/" + pid + "/children", handler);
    }

    /**
     * Gets a person's families.
     * @param pid 
     * @param handler 
     */
    public getPersonWithFamilies(pid: PID, handler: Handler, sourceDescriptions: boolean): void{
        let uri: string = "/platform/tree/persons/" + pid + "/families";
        if(sourceDescriptions){
            uri += "?sourceDescriptions=true";
        }
        this.get(uri, handler);
    }

    // #endregion

    /*=============================================================================================
    [][][][]/
    [][][][]    Memories and Sources
    [][][][]\
    =============================================================================================*/
    // #region Memories and Sources

    /**
     * Retrieves the description for a portrait picture attached as the primary portrait for an individual.
     * @param pid 
     * @param handler 
     * @param defaultUri An unencoded URI for a default image if no portrait is found.
     */
    public getPersonPortrait(pid: PID, handler: Handler, defaultUri?: string): void{
        let uri = "/platform/tree/persons/" + pid + "/portrait";
        if(defaultUri){
            uri += "?default=" + encodeURIComponent(defaultUri);
        }
        this.get(uri, handler);
    }

    /**
     * Retrieves descriptions for all of the portrait pictures available for an individual.
     * @param pid 
     * @param handler 
     */
    public getPersonPortraits(pid: PID, handler: Handler): void{
        this.get("/platform/tree/persons/" + pid + "/portraits", handler);
    }

    /**
     * Retrieves descriptions for all of the memories available for an individual.
     * @param pid 
     * @param handler 
     * @param count <optional> The number of stories to request
     * @param startIndex <optional> The start index for the returned stories
     * @param filter <optional> If there is a particular type of resource desired, a filter may be used. Either "Photo", "Document", or "Story".
     */
    protected getPersonMemories(pid: PID, handler: Handler, count?: number, startIndex?: number, filter?: string): void{
        let url = "/platform/tree/persons/" + pid + "/memories";
        let params = [];
        if(count > 0){
            params.push("count=" + count);
        }
        if(startIndex > 0){
            params.push("start=" + startIndex);
        }
        if(filter && (filter === "Photo" || filter === "Document" || filter === "Story")){
            params.push("type=" + filter);
        }
        if(params.length){
            url += "?" + params.join("&");
        }
        this.get("/platform/tree/persons/" + pid + "/memories", handler);
    }

    /**
     * Retrieves descriptions for all of the story memories available for an individual.
     * @param pid 
     * @param handler 
     * @param count <optional> The number of stories to request. If blank or negative, requests them all.
     * @param startIndex <optional> The start index for the returned stories If blank or negative, defaults to 0.
     */
    public getPersonStoryMemories(pid: PID, handler: Handler, count?: number, startIndex?: number): void{
        this.getPersonMemories(pid, handler, count, startIndex, "Story");
    }

    /**
     * Retrieves descriptions for all of the document memories available for an individual.
     * @param pid 
     * @param handler 
     * @param count <optional> The number of documents to request
     * @param startIndex <optional> The start index for the returned documents
     */
    public getPersonDocumentMemories(pid: PID, handler: Handler, count?: number, startIndex?: number): void{
        this.getPersonMemories(pid, handler, count, startIndex, "Document");
    }

    /**
     * Retrieves descriptions for all of the photo memories available for an individual.
     * @param pid 
     * @param handler 
     * @param count <optional> The number of documents to request
     * @param startIndex <optional> The start index for the returned documents
     */
    public getPersonPhotoMemories(pid: PID, handler: Handler, count?: number, startIndex?: number): void{
        this.getPersonMemories(pid, handler, count, startIndex, "Photo");
    }

    /**
     * Retrieves descriptions for all of the memories available for an individual.
     * @param pid 
     * @param handler 
     * @param count <optional> The number of photos to request
     * @param startIndex <optional> The start index for the returned photos
     */
    public getAllPersonMemories(pid: PID, handler: Handler, count?: number, startIndex?: number): void{
        this.getPersonMemories(pid, handler, count, startIndex);
    }

    /**
     * Provides a list of all sources attached to a person.
     * @param pid 
     * @param handler 
     */
    public getPersonSources(pid: PID, handler: Handler): void{
        this.get("/platform/tree/persons/" + pid + "/sources", handler);
    }

    // #endregion
    
    /*=============================================================================================
    [][][][]/
    [][][][]    Matches & Duplicates
    [][][][]\
    =============================================================================================*/
    // #region Matches

    public getPersonDuplicateMatches(pid: PID, handler: Handler, includeNotAMatchDeclarations?: boolean){
        let uri = "/platform/tree/persons/" + pid + "/matches";
        if(includeNotAMatchDeclarations){
            uri += "?includeNotAMatchDeclarations=true"
        }
        this.get(uri, {headers:{"Accept":"application/x-gedcomx-atom+json"}}, handler);
    }

    public getPersonRecordMatches(pid: PID, handler: Handler, status: "pending" | "accepted" | "rejected" = "pending", count: number = 5, confidence: number = -1){
        
        let uri = "/platform/tree/persons/" + pid + "/matches";
        let params:string[] = [
            "status=" + status,
            "collection=" + encodeURIComponent("records"),
            "count=" + count
        ];
        if(confidence > -1){
            confidence = Math.min(confidence, 5); // The max cap on this is 5.
            params.push("confidence=" + confidence);
        }

        // Meld all of the query parameters onto the uri
        if(params.length){
            uri += "?" +  params.join("&");
        }
        
        this.get(uri, {headers:{"Accept":"application/x-gedcomx-atom+json"}}, handler);
    }

    // #endregion

    /*=============================================================================================
    [][][][]/
    [][][][]    Redirect To FamilySearch
    [][][][]\
    =============================================================================================*/
    // #region FamilySearch Redirect

    /**
     * Opens up a new tab to the FamilySearch person page.
     * Differs from viewInFamilySearchTab() in that the API docs say that eventually it might not require the user to reauthenticate.
     * @param pid 
     */
    public openNewTabFamilySearchPerson(pid: PID): void{
        window.open("https://api.familysearch.org/redirect?person=" + pid + "&access_token=" + this.getAccessToken());
    }

    /**
     * Opens up a new tab to the FamilySearch person page.
     * Will definitely require the user to log in to FamilySearch again if they haven't already.
     * @param pid 
     */
    public viewInFamilySearchTab(pid: PID): void{
        window.open("https://familysearch.org/tree/#view=ancestor&person=" + pid);
    }
    // #endregion
}
// #endregion


/*=============================================================================================
[][][][]/
[][][][]    FamilySearchX Tree Parsing
[][][][]\
=============================================================================================*/
// #region FSX Tree Parsing

/**
 * FamilySearch currently ships descendancy data with a list of people only connected by a
 * descendancyNumber field in their display properties.
 * The descendancyNumber is currently a d'Aboville number.
 * The FSXdAbovilleData type represents that number in its more useful components
 */
type FSXdAbovilleData = {
    parentA: string,
    parentB: string,
    spouse: string,
    subject: string,
    generation: number;
}

/**
 * FamilySearch currently ships descendancy data with a list of people only connected by a
 * descendancyNumber field in their display properties.
 * The descendancyNumber is currently a d'Aboville number.
 * The FSXdAbovilleParser class provides functionality for converting between the string
 * provided and a parsed data object with easy reference to the d'Aboville numbers for parents and the default spouse.
 */
class FSXdAbovilleParser{
    protected parts: string[];
    constructor(){}

    /**
     * Extracts relevant data from a descendancy number
     * @param daboId the d'Aboville identifier for a particular person within a tree.
     */
    static getData(daboId: string): FSXdAbovilleData{
        let parts = daboId.split(".");
        const out: FSXdAbovilleData = {
            parentA: "",
            parentB: "",
            spouse: "",
            subject: parts.join("."),
            generation: parts.length - 1
        }

        // Calculate Spouse
        out.spouse = parts.slice(0, -1).join(".") + (parts.length > 1 ? "." : "") + this.toggleSpouse(parts[parts.length - 1]);
        const last = parts[parts.length - 1];
        parts = parts.slice(0, -1);

        if(parts.length && !this.isSpouse(last)){
            if(this.isSpouse(parts[parts.length - 1])){
                out.parentA = parts.slice(0, -1).join(".") + (parts.length > 1 ? "." : "") + this.toggleSpouse(parts[parts.length - 1]);
                out.parentB = parts.join(".");
            }
            else{
                out.parentA = parts.join(".");
                out.parentB = parts.slice(0, -1).join(".") + (parts.length > 1 ? "." : "") + this.toggleSpouse(parts[parts.length - 1]);
            }
        }
        return out;
    }

    public static isSpouse(target: string){
        return(target.indexOf("-S") !== -1);
    }

    public static toggleSpouse(target: string): string{
        if(!this.isSpouse(target)){
            return target + "-S";
        }
        else{
            return target.split("-S")[0];
        }
    }
}

abstract class FSXPedigreeBuilder{
    protected cache: {[k:string]: FSPerson}
    constructor(protected fsx: FamilySearchX, protected pid: PID, protected generations: number){
        if(generations > this.getMaxRecommendedGenerations()){
            console.error("You requested downloading", this.generations, "generations of data. This may take a while.");
        }
        this.cache = {};
    }
    
    public run(): Promise<{root: PID, people: FSPerson[]}>{
        let allPeople: FSPerson[] = [];
        return new Promise((resolve: Function, reject: Function) => {
            let leavesOutStanding: number = 0;
            let runStep = (pid: PID, generationsRemaining: number) => {

                // console.log("Step:", generationsRemaining);
                let nextSet: number = Math.min(generationsRemaining, this.getMaxGenerations());
                leavesOutStanding++;

                this.runGenerations(pid, nextSet).then((data: {allPeople: FSPerson[], leafIds: PID[]}) => {
                    generationsRemaining -= nextSet;
                    allPeople = allPeople.concat(data.allPeople);
                    if(--leavesOutStanding === 0){
                        resolve({
                            root: this.pid,
                            people: allPeople
                        });
                        return;
                    }
                    if(generationsRemaining !== 0 && data.leafIds.length != 0){
                        data.leafIds.forEach((leaf: PID) => {
                            runStep(leaf, generationsRemaining);
                        });
                    }
                },
                (rejection: any) => {
                    reject(rejection);
                });
            }
            runStep(this.pid, this.generations);
        });
    }

    /**
     * Descendancy data does not ship with relationship references. We're going to add them, so we
     * generate the appropriate arrays in the display properties.
     * @param person 
     */
    protected addRelationshipArrays(person: FSPerson): void{
        if(!person.display.familiesAsParent){
            person.display.familiesAsParent = [];
        }
        if(!person.display.familiesAsChild){
            person.display.familiesAsChild = [];
        }
    }

    /**
     * Adds a child for a person under a particular spouse.
     * @param subject The person receiving a child
     * @param spouseId The ID of the other parent of the child
     * @param childId The PID of the child
     */
    protected addChild(subject:FSPerson, spouseId: PID, childId: PID){
        let spouseView: FSFamilyView;
        const childObject: FSResourceReference = {
            resource: "FSXChildof-" + subject.id + "," + spouseId + ":" + childId,
            resourceId: childId
        }
        if(!subject.display.familiesAsParent.some((view: FSFamilyView) => {
            if(view.parent1.resourceId === subject.id || view.parent2.resourceId === subject.id){
                spouseView = view;
                if(!view.children.some((ref: FSResourceReference) => {
                    return ref.resourceId === childId
                })){
                    view.children.push(childObject);
                }
                return true;
            }
            return false;
        })){
            spouseView = new FSFamilyView();
            spouseView.links = {};
            spouseView.id = "FSXFamilyViewof-" + subject.id + "," + spouseId;
            spouseView.parent1 = {
                resource: "FSXSpouseof-" + subject.id + ":" + spouseId,
                resourceId: subject.id
            };
            spouseView.parent2 = {
                resource: "FSXSpouseof-" + spouseId + ":" + subject.id,
                resourceId: spouseId
            };
            spouseView.children = [
                childObject
            ];
            subject.display.familiesAsParent.push(spouseView);
        }
    }

    /**
     * Adds a spouse to a person, creating a families as parent entry with the designated spouse.
     * @param subject The person receiving a child
     * @param spouseId The ID of the spouse
     */
    protected addSpouse(subject:FSPerson, spouseId: PID){
        let spouseView: FSFamilyView;
        if(!subject.display.familiesAsParent.some((view: FSFamilyView) => {
            return (view.parent1.resourceId === spouseId || view.parent2.resourceId === spouseId);
        })){
            spouseView = new FSFamilyView();
            spouseView.links = {};
            spouseView.id = "FSXFamilyViewof-" + subject.id + "," + spouseId;
            spouseView.parent1 = {
                resource: "FSXSpouseof-" + subject.id + ":" + spouseId,
                resourceId: subject.id
            };
            spouseView.parent2 = {
                resource: "FSXSpouseof-" + spouseId + ":" + subject.id,
                resourceId: spouseId
            };
            spouseView.children = [];
            subject.display.familiesAsParent.push(spouseView);
        }
        // console.log("Added spouse:", subject.id, spouseId, spouseView);
    }

    /**
     * Adds a spouse to a person, creating a families as parent entry with the designated spouse.
     * @param subject The person receiving a child
     * @param spouseId The ID of the spouse
     */
    protected addParents(subject:FSPerson, parentAId: PID, parentBId: PID){
        let spouseView: FSFamilyView;
        const childReference: FSResourceReference = {
            resource: "FSXChildof-" + parentAId + "," + parentBId + ":" + subject.id,
            resourceId: subject.id
        };
        if(!subject.display.familiesAsChild.some((view: FSFamilyView) => { // If there isn't already a view with these two parents
            if(
                (view.parent1.resourceId == parentAId && view.parent2.resourceId === parentBId) ||
                (view.parent1.resourceId == parentBId && view.parent2.resourceId === parentAId)
            ){ // If there is already a view with these two parents
                if(!view.children.some((ref: FSResourceReference) => { // If they are not already included
                    return(ref.resourceId === subject.id);
                })){ // Then include them in this family
                    view.children.push(childReference); 
                }
                return true;
            }
            return false;
        })){ // Then make one.
            spouseView = new FSFamilyView();
            spouseView.links = {};
            spouseView.id = "FSXFamilyViewof-" + parentAId + "," + parentBId;
            spouseView.parent1 = {
                resource: "FSXSpouseof-" + parentAId + ":" + parentBId,
                resourceId: parentAId
            };
            spouseView.parent2 = {
                resource: "FSXSpouseof-" + parentBId + ":" + parentAId,
                resourceId: parentBId
            };
            spouseView.children = [childReference];
            subject.display.familiesAsChild.push(spouseView);
        }
        // console.log("Added parents:", subject.id, parentAId, parentBId);
    }

    public abstract getMaxGenerations(): number;
    public abstract getMaxRecommendedGenerations(): number;
    protected abstract runGenerations(pid: PID, generations: number):Promise<{allPeople: FSPerson[], leafIds: PID[]}>;
}

class FSXDescendancyBuilder extends FSXPedigreeBuilder{
    public static readonly MAX_GENERATIONS_PER_CALL = 2;
    public static readonly MAX_GENERATIONS_RECOMMENDED = 5;

    public getMaxGenerations(): number{
        return FSXDescendancyBuilder.MAX_GENERATIONS_PER_CALL;
    }

    public getMaxRecommendedGenerations(): number{
        return FSXDescendancyBuilder.MAX_GENERATIONS_RECOMMENDED;
    }

    protected runGenerations(pid: PID, generations: number):Promise<{allPeople: FSPerson[], leafIds: PID[]}>{
        return new Promise((resolve: Function, reject: Function) => {
            this.fsx.getPersonWithDescendancy(this.pid, (error: any, response: FSResponse) => {
                if(error){
                    reject(error);
                    return;
                }
                if(!!response.data){ // Check for JSON data.
                    resolve(this.connectDescendancyData(response.data.persons, generations));
                    return;
                }
                resolve();
            }, generations, "", true, true);
        });
    }

    /**
     * Given a group of people, it will attach the PID's of linked family members to the people,
     * creating a tree that is more intuitive than using the d'Aboville numbers.
     * @param people 
     */
    private connectDescendancyData(people: FSPerson[], generations: number): {allPeople: FSPerson[], leafIds: PID[]}{
        let leaves: PID[] = [];
        let descMap: {[k: string]: PID} = {};

        // Cache, fill out the relationship areas, and store the descendancyNumber;
        people.forEach((subject: FSPerson) => {
            if(!this.cache[subject.id]){
                this.cache[subject.id] = subject;
            }
            this.addRelationshipArrays(subject);
            descMap[subject.display.descendancyNumber] = subject.id;
        });

        let data: FSXdAbovilleData,
            parentAId: PID,
            parentBId: PID,
            spouseId: PID,
            parentA: FSPerson,
            parentB: FSPerson,
            spouse: FSPerson;
        let i = 0;
        people.forEach((subject: FSPerson) => {
            data = FSXdAbovilleParser.getData(subject.display.descendancyNumber); // Get the d'Aboville parsing
            if(data.generation === generations){
                leaves.push(subject.id);
            }

            parentAId = descMap[data.parentA];
            parentBId = descMap[data.parentB];
            spouseId = descMap[data.spouse];

            if(!!parentAId){ // If the first parent exists, add this person as a child
                parentA = this.cache[parentAId];
                this.addChild(parentA, parentBId, subject.id);
            }
            if(!!parentBId){ // If the second parent exists, add this person as a child
                parentB = this.cache[parentBId];
                this.addChild(parentB, parentAId, subject.id);
            }
            if(!!parentAId || !!parentBId){ // If either parent exists, add them
                this.addParents(subject, parentAId, parentBId);
            }
            if(!!spouseId){ // If the spouse exists, add them as a spouse.
                spouse = this.cache[spouseId];
                this.addSpouse(subject, spouseId);
            }
        });

        return {
            allPeople: people,
            leafIds: leaves
        };
    }

}

class FSXAncestryBuilder extends FSXPedigreeBuilder{
    public static readonly MAX_GENERATIONS_PER_CALL = 8;
    public static readonly MAX_GENERATIONS_RECOMMENDED = 16;

    public getMaxGenerations(): number{
        return FSXAncestryBuilder.MAX_GENERATIONS_PER_CALL;
    }

    public getMaxRecommendedGenerations(): number{
        return FSXAncestryBuilder.MAX_GENERATIONS_RECOMMENDED;
    }

    protected runGenerations(pid: PID, generations: number):Promise<{allPeople: FSPerson[], leafIds: PID[]}>{
        return new Promise((resolve: Function, reject: Function) => {
            this.fsx.getPersonWithAncestry(this.pid, (error: any, response: FSResponse) => {
                if(error){
                    reject(error);
                    return;
                }
                if(!!response.data){ // Check for JSON data.
                    resolve(this.connectAncestryData(response.data.persons, generations));
                    return;
                }
                resolve();
            }, generations, "", true, false, true);
        });
    }

    private connectAncestryData(people: FSPerson[], generations: number){
        let leaves: PID[] = [];
        let ahnenMap: {[k: string]: PID} = {};

        // Cache, fill out the relationship areas, and store the descendancyNumber;
        people.forEach((subject: FSPerson) => {
            if(!this.cache[subject.id]){
                this.cache[subject.id] = subject;
            }
            this.addRelationshipArrays(subject);
            ahnenMap[subject.display.ascendancyNumber] = subject.id;
        });

        let ahnen: string,
            ahnenNumber: number,
            parentAAhnen: string,
            parentBAhnen: string,
            spouseAhnen: string,
            parentAId: PID,
            parentBId: PID,
            spouseId: PID,
            parentA: FSPerson,
            parentB: FSPerson,
            spouse: FSPerson;
        let i = 0;

        people.forEach((subject: FSPerson) => {
            ahnen = subject.display.ascendancyNumber;
            if(FSXdAbovilleParser.isSpouse(ahnen)){
                let spouseAhnen = FSXdAbovilleParser.toggleSpouse(ahnen);
                this.addSpouse(subject, spouseAhnen);
                this.addSpouse(this.cache[ahnenMap[spouseAhnen]], ahnen);
                return;
            }

            ahnenNumber = parseInt(ahnen);
            parentAId = ahnenMap[ahnenNumber * 2];
            parentBId = ahnenMap[ahnenNumber * 2 + 1];
            spouseId = ahnenMap[FSXdAbovilleParser.toggleSpouse(ahnen)];

            if(!!parentAId){ // If the first parent exists, add this person as a child
                parentA = this.cache[parentAId];
                this.addChild(parentA, parentBId, subject.id);
            }
            if(!!parentBId){ // If the second parent exists, add this person as a child
                parentB = this.cache[parentBId];
                this.addChild(parentB, parentAId, subject.id);
            }
            if(!!parentAId || !!parentBId){ // If either parent exists, add them
                this.addParents(subject, parentAId, parentBId);
            }
            else if(ahnenNumber >= (i = Math.pow(2, generations)) && ahnenNumber < 2 * i){
                leaves.push(subject.id);
            }
            if(!!spouseId){ // If the spouse exists, add them as a spouse.
                spouse = this.cache[spouseId];
                this.addSpouse(subject, spouseId);
            }
        });

        return {
            allPeople: people,
            leafIds: leaves
        };
    }
}


// #endregion