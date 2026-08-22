type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {picture ? (
        <Image
          src={picture}
          className="mr-4 h-12 w-12 rounded-full object-cover"
          alt={name}
          width={48}
          height={48}
        />
      ) : (
        <span
          aria-hidden="true"
          className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-neutral-800"
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;

import Image from "next/image";
