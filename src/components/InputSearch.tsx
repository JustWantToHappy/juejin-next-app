import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = () => {
	const [focus, setFocus] = React.useState(false);

	return (
		<form className="flex relative">
			<input
				type="search"
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className="py-2 pl-4 pr-12 w-[170px] hover:border-juejin-font-2 focus:w-[300px] transition-w duration-200 ease peer border-juejin-font-4"
				placeholder={focus ? "搜索文章/小册/标签/用户" : "探索稀土掘金"}
			/>
			<div className="absolute right-1 w-12 h-[90%] -translate-y-1/2 top-1/2 bg-juejin-gray-1-1 flex items-center justify-center peer-focus:bg-juejin-brand-5-light peer-focus:text-juejin-brand-1-normal">
				<AiOutlineSearch className="text-xl" />
			</div>
		</form>
	);
};

export default InputSearch;
