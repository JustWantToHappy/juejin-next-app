import React from "react";
import { isClientSide } from "@/utils";

export const useIsClient = () => {
	const [isClient, setIsClient] = React.useState(isClientSide());

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	return isClient;
};
