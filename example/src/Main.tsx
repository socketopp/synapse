import React from "react";
import Synapse, { IMessage } from "./Synapse";

interface IProps { }

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

	async componentDidMount() {

		let message = await this.state.synapse.getWords("data");
		this.setState({ message });

	}
}

export default Main;


