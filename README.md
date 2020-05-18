# Synapse
Synapse is a trivial module written in TypeScript and React that scrapes swedish synonyms from synonymer.se. 

# Usage

Import Synapse and IMessage from the Synapse module and add synapse and the message to your state.
(IMessage is an interface for the message being sent). Then, instantiate Synapse and the message container in the state for further use. 

```javascript
import Synapse, { IMessage } from "./Synapse";

interface IState {
	synapse: Synapse;
	message: IMessage;
}
class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
	this.state = {
	    synapse: new Synapse(),
	    message: { data: [], response: "ERROR", status: false }
	};
}
```
Call `getWords(word:string)` with the word you want to get synonyms for and the set state with the result. Then do whatever you want with the result. See the example to render a simple list. 
```javascript
async componentDidMount() {
    let message = await this.state.synapse.getWords("data");
    this.setState({ message });
}
```

Here is an example of rendering. The result is located inside data which is an string array.
```javascript
renderWords = () => {

    let data: string[] = this.state.message.data;
    let status: boolean = this.state.message.status;
    return <ul> {status && data.map((word) => {
	return <li> {word}</li>
    })} </ul>
}

render() {
	return <ul> {this.renderWords()}</ul>
}
```

# Applications
I made this so that I can later use it in a hobby project to visualize the networks of synonyms. The idea is to use a data visualization library such as D3js or similar in orchestra vid synapse. 
