import Link from "next/link";
import { useRouter } from "next/navigation";

const Complete = () => {
    const router = useRouter();
    const handlerComplete = () => {
        router.push("");
    };
    return (
        <Link
            href={"/genre"}
            className="text-sm hover:text-purple-300 transition-colors duration-300"
        >
            Lihat Complete →
        </Link>
    );
};
export default Complete;
