import { LinkButton } from "../../link";

export const UpdateProfile = () => {
  return (
    <div className="px-2 py-4 bg-[#1795BD] text-white text-center flex flex-col justify-center items-center gap-3 rounded-2xl">
      <div className="w-fit bg-white p-4 rounded-full">
        <img src="/images/sidebar/fingerprint.svg" alt="" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-xs">Update your Profile !</h4>
        <p className="text-[10px]">
          Update your profile and find the best opportunities
        </p>
      </div>
      <LinkButton to={"/profile"} className={"p-2 !font-medium !text-[11px]"} primary={true}>
        Complete your profile
      </LinkButton>
    </div>
  );
};
