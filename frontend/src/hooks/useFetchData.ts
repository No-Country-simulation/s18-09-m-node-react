import { ServiceTypes } from "@/types";
import services from "@/services";

const useFetchData = () => {
    const fetchData = async <T extends keyof ServiceTypes>(service: T, data: ServiceTypes[T]) => {
        try {
            return { status: true, response: (await services[service](data)).data };
        } catch (error) {
            return { status: false, error };
        }
    };
    return { fetchData };
};

export default useFetchData;