export namespace utils {
	
	export class Job {
	    title: string;
	    company: string;
	    location: string;
	    link: string;
	
	    static createFrom(source: any = {}) {
	        return new Job(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.company = source["company"];
	        this.location = source["location"];
	        this.link = source["link"];
	    }
	}

}

