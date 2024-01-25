import { Patch, Get } from "@/utils";
import { loginModal } from "@/store";
import { useSession } from "next-auth/react";
import { getElementTopOffset } from "@/utils";
import type { IconType } from "react-icons";
import { TimerRefContext } from "@/context";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { FaCommentDots, FaShare } from "react-icons/fa";
import {
	AiTwotoneLike,
	AiTwotoneWarning,
	AiFillStar,
	AiOutlineRead,
} from "react-icons/ai";

const ArticleLayout: React.FC<
	React.PropsWithChildren & { articleId: string; likeCount: number }
> = (props) => {
	const router = useRouter();
	const { onOpen } = loginModal();
	const { data: session } = useSession();
	const timerRef = React.useContext(TimerRefContext);
	const [isLike, setIsLike] = React.useState(false);
	const [likeCount, setLikeCount] = React.useState(props.likeCount);

	const giveAnLike = async () => {
		if (!session) {
			onOpen();
			return;
		}
		if (session.user.id) {
			Patch(`/api/like`, {
				userId: session.user.id,
				articleId: props.articleId,
			}).then((res) => {
				setIsLike(Boolean(res));
				setLikeCount((count) => (Boolean(res) ? count + 1 : count - 1));
			});
		}
	};

	const scrollToComments = (event: React.MouseEvent) => {
		event.preventDefault();
		const comments = document.querySelector("[data-id='comment']");
		if (comments instanceof HTMLElement && timerRef) {
			const offsetTop = getElementTopOffset(comments);
			window.scrollTo({ top: offsetTop - 60 });
			router.push("#comment");
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
			}, 300);
		}
	};

	const icons: {
		icon: IconType;
		href?: string;
		onClick?: MouseEventHandler;
	}[] = [
		{ icon: AiTwotoneLike, onClick: giveAnLike },
		{ icon: FaCommentDots, href: "#comment", onClick: scrollToComments },
		{ icon: AiFillStar },
		{ icon: FaShare },
		{ icon: AiTwotoneWarning },
		{ icon: AiOutlineRead },
	];
	React.useEffect(() => {
		if (likeCount > 0) {
			const style = document.createElement("style");
			document.head.appendChild(style);
			const sheet = style.sheet;
			sheet?.insertRule(`.like::after{content:'${likeCount}'}`);
		}
	}, [likeCount]);

	React.useLayoutEffect(() => {
		(async () => {
			const data = await Get<string>(
				`/api/like?userId=${session?.user.id}&articleId=${props.articleId}`,
			);
			setIsLike(Boolean(data));
		})();
	}, [session, props.articleId]);
	return (
		<>
			{props.children}
			<ul className="hidden sm:flex flex-col fixed z-30 left-3 top-[140px] gap-y-6 w-14 h-[400px]  ">
				{icons.map((item, index) => {
					const Icon = item.icon;
					return (
						<li
							key={index}
							onClick={item.onClick}
							className={`text-juejin-font-3 flex items-center justify-center bg-juejin-layer-1 w-full h-14 rounded-full cursor-pointer group relative ${index === 0 && likeCount > 0 && ` after:absolute after:content-[${likeCount}] after:bg-juejin-brand-1-normal after:px-1 after:flex after:items-center after:justify-center after:text-juejin-layer-1 after:rounded-full after:top-0 after:right-0 after:translate-x-1/2 like`}`}
						>
							<Icon
								size="20"
								className={`  ${index === 0 && isLike ? " text-juejin-brand-1-normal" : "group-hover:text-juejin-font-2"}`}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default ArticleLayout;
