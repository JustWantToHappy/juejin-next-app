import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { CatelogueType } from "@/types";
import { TimerRefContext } from "@/context";
import { getElementTopOffset, parseFromHashURL } from "@/utils";

type Props = {
	active: number;
	catelogue: CatelogueType[];
	smoothScroll?: boolean;
	markdownContainer: HTMLDivElement | undefined;
};

const Catelogue: React.FC<Props> = ({
	catelogue,
	smoothScroll = false,
	markdownContainer,
	active: activeItem,
}) => {
	const router = useRouter();
	const catelogueRef = React.useRef<HTMLUListElement>();
	const cateloguesRef = React.useRef<HTMLLIElement[]>([]);
	const timerRef = React.useContext(TimerRefContext);
	const [active, setActive] = React.useState(-1);

	const originClick = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	const handleClickCatelogue = (event: React.MouseEvent) => {
		event.preventDefault();
		if (markdownContainer && timerRef) {
			const index = event.currentTarget.getAttribute("data-index");
			const hash = `#heading-${index}`;
			const titleEle = markdownContainer.querySelector(
				`[data-id='${hash.slice(1)}']`,
			) as HTMLElement;
			if (titleEle) {
				const offsetTop = getElementTopOffset(titleEle);
				window.scrollTo({
					top: offsetTop - 60,
					behavior: smoothScroll ? "smooth" : "auto",
				});
			}
			setActive(parseInt(index ?? "0"));
			router.push(hash);
		}
	};

	React.useEffect(() => {
		if (activeItem >= 0) {
			setActive(activeItem);
			const target = cateloguesRef.current[activeItem];
			if (target && catelogueRef.current) {
				const offset =
					target.offsetTop - catelogueRef.current.clientHeight / 3;
				catelogueRef.current.scrollTo({ top: offset });
			}
		}
	}, [activeItem]);

	//React.useEffect(() => {
	//  const handleHashChangeComplete = () => {
	//    const index = parseFromHashURL(router.asPath)
	//    if (!isNaN(index)) {
	//      setActive(index)
	//    }
	//  }
	//  router.events.on('hashChangeComplete', handleHashChangeComplete)
	//  return function () {
	//    router.events.off('hashChangeComplete', handleHashChangeComplete)
	//  }
	//}, [router])

	//初始化页面同步hash
	React.useEffect(() => {
		if (markdownContainer) {
			const index = parseFromHashURL(window.location.hash);
			if (!isNaN(index)) {
				const titleEle = markdownContainer.querySelector(
					`[data-id='${location.hash.slice(1)}']`,
				) as HTMLElement;
				if (titleEle) {
					const offsetTop = getElementTopOffset(titleEle);
					window.scrollTo({
						top: offsetTop - 60,
						behavior: smoothScroll ? "smooth" : "auto",
					});
				}
				setActive(index);
			}
		}
	}, [markdownContainer, smoothScroll]);

	const generateCatelogueTree = (
		catelogue: CatelogueType[],
		level: number,
	) => {
		return (
			<ul
				ref={(current) => {
					if (!level)
						catelogueRef.current = current as HTMLUListElement;
				}}
				className={`text-md ${!level && "max-h-[--catelogue-max-height]"} transition-all duration-300 overflow-auto scroll-container mr-1 ${!level ? "mt-3" : ""}`}
			>
				{catelogue.map((item) => (
					<React.Fragment key={item.index}>
						<li
							ref={(current) => {
								if (!cateloguesRef.current[item.index]) {
									cateloguesRef.current[item.index] =
										current as HTMLLIElement;
								}
							}}
							data-index={item.index}
							onClick={handleClickCatelogue}
							style={{ paddingLeft: `${16 * level}px` }}
							className={`before:absolute before:w-[4px]  before:rounded-sm  before:h-4  before:top-1/2   before:bg-juejin-brand-1-normal before:-left-[0px] before:-translate-y-1/2 relative cursor-pointer group h-10 leading-10 ellipsis transition-all duration-300 ${active === item.index ? "before:block" : "before:hidden"}`}
						>
							<Link
								title={item.title}
								href={`#heading-${item.index}`}
								onClick={originClick}
								style={
									active === item.index
										? { color: "#1171ee" }
										: {}
								}
								className="ml-3 group-hover:text-juejin-brand-2-hover block w-full"
							>
								{item.title}
							</Link>
						</li>
						{item.children?.length
							? generateCatelogueTree(item.children, level + 1)
							: ""}
					</React.Fragment>
				))}
			</ul>
		);
	};

	return (
		<nav>
			<div className="pb-4 mr-3 text-xl border-b border-b-juejin-gray-1-1  ml-3">
				目录
			</div>
			{generateCatelogueTree(catelogue, 0)}
		</nav>
	);
};

export default Catelogue;
