import React from "react";
import type { NextPage } from "next";
import { useIsClient } from "@/hooks";

const ErrorPage: NextPage<{ statusCode: number; error: any }> = ({
	statusCode,
	error,
}) => {
	const isClient = useIsClient();
	if (statusCode < 500) {
		return <p>Client Error {statusCode}</p>;
	}
	return <p>Server Error {statusCode}</p>;
};

ErrorPage.getInitialProps = ({ res, err }) => {
	const statusCode = res
		? (res.statusCode as number)
		: err
			? (err.statusCode as number)
			: 404;
	return { statusCode, error: err };
};

export default ErrorPage;
