import Image from 'next/image';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    imageSrc: string;
    imageAlt: string;
    objectPosition?: string;
    children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, imageSrc, imageAlt, objectPosition = 'center', children }) => {
    return (
        <div className="h-[600px] sm:h-[500px] relative">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover scale-x-[-1]"
                    style={{ objectPosition }}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhgJAi5qj4AAAAABJRU5ErkJggg=="
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30' />
            </div>
            <div className='relative h-full w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col justify-center h-full pt-16'>
                    <div className='lg:w-1/2'>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white'>
                            {title}
                        </h1>
                        {subtitle && (
                            <p className='mt-6 text-lg sm:text-xl text-gray-200'>
                                {subtitle}
                            </p>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHero;
