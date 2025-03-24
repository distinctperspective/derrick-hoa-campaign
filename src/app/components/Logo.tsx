import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    imageClassName?: string;
    width?: number;
    height?: number;
}

const Logo = ({ className = '', imageClassName = '', width = 150, height = 50 }: LogoProps) => {
    return (
        <Link href="/" className={className}>
            <Image
                src="/images/dtlogo.png"
                alt="Logo"
                width={width}
                height={height}
                className={imageClassName}
            />
        </Link>
    );
};

export default Logo;
