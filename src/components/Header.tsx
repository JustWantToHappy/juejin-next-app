import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Nav } from "@/types";
import useSwr, { Fetcher } from "swr";
import { Get } from "@/utils";
import { useRouter } from "next/router";
import InputSearch from "./InputSearch";
import { useSession, signOut } from "next-auth/react";
import JuejinSvg from "../../public/juejin.svg";
import { headerStore, loginModal } from "@/store";
import JuejinSmallSvg from "../../public/juejin-small.svg";
import { AiFillCaretDown, AiFillBell } from "react-icons/ai";

const Header = () => {
	const { data: session } = useSession();
	const header = headerStore();
	const router = useRouter();
	const { onOpen } = loginModal();
	const [shrink, setShrink] = React.useState(true);
	const [navs] = React.useState<Nav[]>([
		{
			key: "",
			name: "首页",
		},
		{
			key: "pins",
			name: "沸点",
		},
		{
			key: "course",
			name: "课程",
		},
		{
			key: "live",
			name: "直播",
		},
		{
			key: "events/all",
			name: "活动",
		},
		{
			key: "challenge",
			name: "竞赛",
		},
		{
			key: "goods",
			name: "商城",
		},
		{
			key: "app",
			name: "App",
		},
		{
			key: "extension",
			name: "插件",
		},
	]);

	//const fetcher: Fetcher<Nav[]> = (url: string) => Get<Nav[]>(url)
	//const { data } = useSwr('/api/nav', fetcher)

	const handleSignOut = async () => {
		//退出登录之后重定向地址
		const data = await signOut({ redirect: false, callbackUrl: "/" });
		router.push(data.url);
	};
	const signOutGithub = () => {
		const isSignOut = confirm(
			"确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者！",
		);
		//signOut({ redirect: false })
		if (isSignOut) signOut();
	};

	const write = () => {
		if (!session) {
			onOpen();
			return;
		}
		router.push("/editor");
	};

	return (
		<header
			style={{ top: `${header.close ? "-60px" : "0px"}` }}
			className="w-full flex bg-juejin-layer-1 h-[--nav-header-height] text-juejin-font-2 items-center pl-9  transition-top duration-300 fixed top-0 left-0 right-0 z-40"
		>
			<a>
				<Image
					src={JuejinSvg}
					alt="juejin"
					priority
					width="0"
					height="0"
					className="hidden sm:inline-block w-32 h-auto"
				/>
				<Image
					src={JuejinSmallSvg}
					alt="juejin"
					priority
					width={35}
					className="inline-block sm:hidden"
				/>
			</a>
			<nav>
				<ul className="flex xl:ml-8 ml-4 items-center">
					{/* 窄屏导航栏显示 */}
					<li className="flex xl:hidden cursor-pointer relative">
						<div
							onClick={() => setShrink((state) => !state)}
							className="flex items-center gap-x-1 text-juejin-brand-1-normal"
						>
							<span className=" text-lg">首页</span>
							<AiFillCaretDown
								className={`transition-all ${!shrink ? " -rotate-180" : ""}`}
							/>
						</div>
						<ul
							className={`absolute -bottom-8  ${shrink && "hidden"}`}
						></ul>
					</li>
					{/* 宽屏导航栏显示 */}
					<li className="w-[466px] items-center hidden xl:flex transition-all  duration-200">
						{navs?.map((nav) => (
							<Link
								key={nav.key === "" ? "/" : nav.key}
								href={nav.key === "" ? "/" : nav.key}
								locale="en"
							>
								<div
									className={`mx-3 h-[--nav-header-height] flex items-center justify-center hover:text-juejin-font-1 relative after:absolute after:bottom-0 after:w-full after:h-[2px] after:bg-juejin-brand-1-normal after:opacity-0 hover:after:opacity-100 ${router.pathname === "/" + nav.key ? "after:opacity-100" : ""}`}
								>
									{nav.name}
								</div>
							</Link>
						))}
					</li>
					<li className="absolute right-4">
						<ul className="flex h-11">
							<li className="flex overflow-hidden gap-x-6 items-center ">
								{/*<InputSearch />*/}
								<button
									onClick={write}
									className="btn-primary hidden sm:block"
								>
									创作者中心
								</button>
							</li>
							<li className="ml-6 hidden sm:block group relative">
								{!session ? (
									<button
										onClick={() => onOpen()}
										className="btn-secondary"
									>
										登录&nbsp;|&nbsp;注册
									</button>
								) : (
									<div className="flex items-center gap-x-5 h-full">
										{/*<AiFillBell className=' text-2xl text-juejin-font-3 hover:text-juejin-font-2 cursor-pointer' />*/}
										<div className="relative group">
											<Image
												src={
													session?.user?.image ??
													"http://rzl96k3z6.hn-bkt.clouddn.com/34cee5ff5ab558fd5d3f9290d634b7f5.jpg"
												}
												alt="头像"
												width={40}
												height={40}
												className=" cursor-pointer rounded-full "
											/>
											<div className="arrows-center hidden group-hover:block bg-juejin-layer-1 absolute z-50 -bottom-16 border-t border-t-juejin-gray-1-1 -left-9 p-4 w-24 shadow-md">
												<button
													onClick={signOutGithub}
													className="btn-text"
												>
													退出登录
												</button>
											</div>
										</div>
									</div>
								)}
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
