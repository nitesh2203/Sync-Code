import React, { useState, useEffect } from 'react';
import MyEditor from './../Editor/myEditor';
import Box from './../EditorBox/Box';
import axios from "axios";
import InputBox from './../EditorBox/InputBox';
import { useSnackbar } from 'notistack';

import 'react-reflex/styles.css'

const Room = (props) => {

	const socket = props.socket;


	const getLanguageVersion = {
		cpp17: "0", // g++ 17 GCC 9.10
		java: "3", // JDK 11.0.4
		python3: "3", // 3.7.4
		go: "3", // 1.13.1
		nodejs: "3", // 12.11.1
	};
	const getLanguage = {
		cpp: "cpp17",
		java: "java",
		python: "python3",
		go: "go",
		javascript: "nodejs",
	};

	const [input, setInput] = useState("");
	const [languageInRoom, setlanguageInRoom] = useState("cpp");
	const [output, setoutput] = useState("");
	const [codeInRoom, setcodeInRoom] = useState("");
	const [stats, setstats] = useState("");
	
	const [RoomFontSize, setRoomFontSize] = useState("");
	const [RoomTheme, setRoomTheme] = useState("vs-dark");
	const [isError, setisError] = useState(false)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const runCode = async () => {
		const script = codeInRoom;
		const language = getLanguage[languageInRoom];
		const versionIndex = getLanguageVersion[language]
		const stdin = input;

		try {
			const apiUrl = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
			const response = await axios({
				method: "POST",
				url: `${apiUrl}/execute`,
				data: {
					script: script,
					language: language,
					stdin: stdin,
					versionIndex: versionIndex
				},
				responseType: "json",
			});

			if (response.status === 200) {
				const data = response.data;
				console.log("Response data:", data);
				
				if (data.memory === null || data.cpu === null) {
					setisError(true);
					enqueueSnackbar('Compilation Error', {
						variant: "warning"
					})
					// Handle null output safely
					setoutput(data.output ? data.output.substr(1) : "Compilation Error")
				} else {
					setisError(false);
					enqueueSnackbar('Code executed successfully', {
						variant: "success"
					})
					setoutput(data.output || "");
				}
				
				// Handle null memory and cpuTime safely
				const memory = data.memory || 0;
				const cpuTime = data.cpuTime || 0;
				const statement1 = `Memory used: ${memory} kilobyte(s).\n`
				const statement2 = `CPU time: ${cpuTime} sec(s).`
				var sta = statement1.concat(statement2);
				setstats(sta);
			}
			else {
				enqueueSnackbar('Some Error occurred', {
					variant: "error"
				})
			}
		} catch (error) {
			console.error('Error executing code:', error);
			enqueueSnackbar('Failed to execute code. Please check your connection.', {
				variant: "error"
			})
		}
	}

	return (
		<div>
			<div className="d-flex">
				<MyEditor
					socket={socket}
					nameOfUser={props.nameOfUser}
					setIsDisconnected={props.setIsDisconnected}
					setRoomTheme={setRoomTheme}
					setRoomFontSize={setRoomFontSize}
					runcode={runCode}
					setcodeInRoom={setcodeInRoom}
					setlanguageInRoom={setlanguageInRoom}
				>
				</MyEditor>
			</div>
			
			<div className="d-flex">
				<div className="border mr-auto ml-1" style={{width:"37.5%"}}>
					<InputBox feature="Input" theme={RoomTheme} setProperty={setInput} fontSize={RoomFontSize}/>
				</div>
				<div className="border" style={{width:"37.5%"}}>
					<Box feature={isError?"Error":"Output"} theme={RoomTheme} value={output} fontSize={RoomFontSize}/>
				</div>
				<div className="border ml-auto mr-1" style={{width:"24%"}}>
					<Box feature="Stats" theme={RoomTheme} value={stats} fontSize={RoomFontSize}/>
				</div>
				
			</div>
		</div>
	)
}

export default Room
