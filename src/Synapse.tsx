/**
 * Module for retrieving Swedish synoynms from synonymer.se
 * Written by Sokrates Lamprou
 * Version 1.0
 * Date: 2020-05-15
 */

export interface IMessage {

    data: string[];
    response: string;
    status: boolean;
}

class Synapse {

    private mimeType: SupportedType = "text/html";
    private URL: string = "https://www.synonymer.se/sv-syn/";
    private CORS: string = "https://cors-anywhere.herokuapp.com/";
    private parser = new DOMParser();

    /**
     * Uses querySelectors to retrieve words from the DOM.
     */
    private queryWords = async (document: Document): Promise<IMessage> => {

        let div = document.querySelector("#dict-default");
        let words: string[] = [];
        let message: IMessage = {
            data: [], response: "ERROR", status: false
        };

        if (div) {

            let body = div.querySelector(".body");
            let a = body?.querySelectorAll('a');

            if (a) {
                a.forEach(element => {
                    let word = element.childNodes[0].textContent;
                    if (word) {
                        words.push(word);
                    }
                });
                message = { data: words, response: "OK", status: true };
            }
        }
        return message;
    }

    /**
     * Fetch the DOM that contains synonyms.
     */
    private fetchDom = async (word: string): Promise<string> => {

        let response = await fetch(this.CORS + this.URL + word);
        let htmlContent = await response.text();
        return htmlContent;
    }

    /**
     * Get similar words, i.e. get synonyms for a specific word
     */
    public getWords = async (word: string): Promise<IMessage> => {

        let htmlContent = await this.fetchDom(word);
        const root = this.parser.parseFromString(htmlContent, this.mimeType);
        let message = await this.queryWords(root);
        return message;
    }

}

export default Synapse;