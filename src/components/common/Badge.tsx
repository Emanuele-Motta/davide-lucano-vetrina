import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'teal' | 'gray' | 'emerald' | 'amber';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  icon,
  className = '',
  ...props
}) => {
  const variantStyles = {
    teal: 'bg-[#006875]/10 text-[#006875] border-[#006875]/20',
    gray: 'bg-black/[0.05] text-[#1d1d1f] border-black/[0.08]',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200'
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};

export default Badge;
