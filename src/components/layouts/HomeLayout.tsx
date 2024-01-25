import Link from "next/link";
import React from "react";
import Aside from "../Aside";
import NavTags from "../NavTags";
import { useRouter } from "next/router";

const HomeLayout: React.FC<React.PropsWithChildren> = (props) => {
	const router = useRouter();

	return (
		<div className=" px-10 flex items-start gap-x-[--layer-gap] ">
			<NavTags />
			<div className="flex gap-x-[--layer-gap] flex-1 items-start">
				<div className="lg:w-[--home-recommend-width] layer flex-1 mb-20 ">
					<header
						className={`border-b-juejin-gray-1-3 border-b h-[--home-recommend-header-height] leading-[--home-recommend-header-height] px-[--home-recommend-padding-x] ${router.asPath === "/following" && "hidden"}`}
					>
						<nav>
							<ul className="flex gap-x-10 text-[16px] text-juejin-font-3">
								<li
									className={` hover:text-juejin-brand-2-hover relative after:absolute after:bg-juejin-brand-1-normal after:w-4 after:h-1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-sm ${router.asPath.includes("?sort=newest") && "after:hidden"}`}
								>
									<Link href="/recommended" locale="zh">
										推荐
									</Link>
								</li>
								<li
									className={` hover:text-juejin-brand-2-hover relative after:absolute after:bg-juejin-brand-1-normal after:w-4 after:h-1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded-sm ${!router.asPath.includes("?sort=newest") && "after:hidden"}`}
								>
									<Link
										href={router.asPath + "?sort=newest"}
										locale="zh"
									>
										最新
									</Link>
								</li>
							</ul>
						</nav>
					</header>
					{props.children}
				</div>
				<Aside />
			</div>
		</div>
	);
};

export default HomeLayout;
