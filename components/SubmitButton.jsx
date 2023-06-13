import { Loading } from "./Icons";

export function SubmitButton({ 
  label, 
  loading, 
  onClick, 
  disabled
}) {
  const stateClass = loading || disabled ? 'opacity-80 cursor-not-allowed' : '';
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`bg-orange-500/80 ${stateClass} font-semibold h-[3rem] lg:h-[3rem] py-3 rounded text-gray-50 text-sm relative w-full`}
      disabled={loading || disabled}
    >
      {label}
      {loading && (
        <span className="ml-2 ">
          <Loading h="w-4" />
        </span>
      )}
    </button>
  );
}