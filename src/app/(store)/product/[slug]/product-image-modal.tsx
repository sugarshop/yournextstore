"use client";

import { cn } from "@/lib/utils";
import { YnsLink } from "@/ui/yns-link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ImageModalProps = {
	src: string;
	alt: string;
	slug: string;
	images: string[];
};

export default function ProductImageModal({ src, alt, slug, images }: ImageModalProps) {
	const router = useRouter();

	const onDismiss = () => {
		router.push(`/product/${slug}`);
	};

	const handlePrevious = () => {
		const pos = images.indexOf(src);
		if (pos > 0) {
			router.push(`?image=${images.indexOf(src) - 1}`);
		}
	};

	const handleNext = () => {
		const pos = images.indexOf(src);
		if (pos < images.length - 1) {
			router.push(`?image=${images.indexOf(src) + 1}`);
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") onDismiss();
	};

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onKeyDown]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 bg-neutral-100 z-50 flex flex-col"
			>
				<div className="flex justify-between p-4">
					<div />
					<button onClick={() => onDismiss()} className="text-neutral-500 hover:text-neutral-700">
						<X className="w-6 h-6" />
					</button>
				</div>

				<div className="flex-grow flex items-center justify-center overflow-hidden">
					<motion.div
						key={src}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}
						className="relative w-full h-full"
					>
						<Image src={src} alt={alt} fill className="object-contain" sizes="100vw" priority />
					</motion.div>

					<button
						onClick={(e) => {
							e.stopPropagation();
							handlePrevious();
						}}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-gray-100 transition-colors"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleNext();
						}}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-gray-100 transition-colors"
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				</div>

				<div className="flex justify-center gap-4 py-2">
					{images.map((image, idx) => (
						<YnsLink
							className={cn(src === image && "border-black border rounded-lg overflow-hidden")}
							key={idx}
							onClick={() => {
								router.push(`?image=${idx}`);
							}}
							href={`?image=${idx}`}
							scroll={false}
						>
							<Image src={image} alt={""} width={80} height={80} className="object-cover" sizes="80px" />
						</YnsLink>
					))}
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
