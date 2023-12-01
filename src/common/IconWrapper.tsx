















interface IconWrapperProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  sizeClass: string;
  className?: string;
}

export default function IconWrapper ( {
  icon: Icon,
  sizeClass,
  className
} : IconWrapperProps ) {

    return  <Icon className={`${sizeClass} ${className || ''}`} />
}
