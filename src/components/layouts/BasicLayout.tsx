import React from "react";
import Header from "../Header";
import SignIn from "../SignIn";
import { useRouter } from "next/router";
import { useThrottle } from "@/hooks";
import FloatButtons from "../FloatButtons";
import { headerStore, loginModal } from "@/store";

const BasicLayout: React.FC<React.PropsWithChildren> = (props) => {
	const { open } = loginModal();
	const router = useRouter();
	const { onClose, onOpen, close } = headerStore();
	const [showUpIcon, setShowUpIcon] = React.useState(
		router.pathname === "/editor",
	);
	const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>();
	const prevStopScrollTopRef = React.useRef<number>(0);

	const handleScroll = useThrottle(() => {
		if (router.pathname === "/editor") {
			return;
		}
		const scrollTop = window.scrollY,
			totalHeight = Math.max(
				document.body.scrollHeight,
				document.documentElement.scrollHeight,
			);
		scrollTop > 100 ? setShowUpIcon(true) : setShowUpIcon(false);
		if (scrollTop - prevStopScrollTopRef.current > 100) onClose();
		if (prevStopScrollTopRef.current - scrollTop > 30 || !scrollTop) {
			onOpen();
		} else if (!close && scrollTop >= totalHeight / 3) {
			onClose();
		}
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			prevStopScrollTopRef.current = scrollTop;
		}, 100);
	}, 100);

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return function () {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<main className="">
			{open && <SignIn />}
			{router.pathname !== "/editor" && (
				<>
					<Header />
					<div className="my-[--nav-header-height]"></div>
				</>
			)}
			<div className={`${router.pathname !== "/editor" && "pt-6"}`}>
				{props.children}
			</div>
			<FloatButtons showUpIcon={showUpIcon} />
		</main>
	);
};

export default BasicLayout;
