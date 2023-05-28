"use client"

import Link from "@node_modules/next/dist/client/link";
import Image from "@node_modules/next/dist/client/image";
import {useEffect, useState} from "react";
import {getProviders} from "@node_modules/next-auth/react";

export const Nav = () => {
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);


	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		}
		setProviders();

	}, []);

	return (
		<nav className='flex-between w-full mb-16 p-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					alt='Promptopia logo'
					width={30}
					height={30}
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>


			{/*	DeskTop Navigation  */}
			<div className='sm:flex hidden'>
				{isUserLoggedIn ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>
						<button type='button' className='outline_btn'>Sign Out</button>
						<Link href='/profile'>
							<Image
								className='rounded-full'
								src='/assets/images/logo.svg'
								alt='user picture'
								width={37}
								height={37}
							/>
						</Link>
					</div>) : (
					<>
						{providers && Object.values(providers).map((provider) => (
							<button
								type='button'
								key={provider.name}
								onClick={() => singIn(provider.id)}
								className='black_btn'
							>
								Sing In
							</button>
						))}
					</>
				)}
			</div>

			{/*	Mobile Navigation */}
			<div className='sm:hidden flex relative'>

				{isUserLoggedIn ? (
					<div className='flex'>
						<Image
							className='rounded-full'
							src='/assets/images/logo.svg'
							alt='user picture'
							width={37}
							height={37}
							onClick={() => setToggleDropDown((prev) => (
								!prev
							))}
						/>
						<div/>

						{toggleDropDown ?
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => {
										setToggleDropDown(false)
									}}
								>
									My Profile
								</Link>

								<Link
									href='create-prompt'
									className='dropdown_link'
									onClick={() => {
										setToggleDropDown(false)
									}}>
									Create Prompt
								</Link>
								<button
									className='mt-5 w-full black_btn'
									type='button'
									onClick={() => {
										setToggleDropDown(false)
										signOut();
									}}>
									Sign Out
								</button>
							</div> : (<></>)
						}

					</div>
				) : (<>
						{providers && Object.values(providers).map((provider) => (
							<button
								type='button'
								key={provider.name}
								onClick={() => singIn(provider.id)}
								className='black_btn'
							>
								Sing In
							</button>
						))}
					</>
				)}
			</div>
		</nav>
	)
}
