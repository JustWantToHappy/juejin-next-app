import React from "react";

const TimerRefContext =
	React.createContext<React.MutableRefObject<NodeJS.Timeout | null> | null>(
		null,
	);

export { TimerRefContext };
