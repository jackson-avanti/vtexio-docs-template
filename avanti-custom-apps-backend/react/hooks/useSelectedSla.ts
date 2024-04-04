import useLogisticInfos from "./useLogisticInfos"

const useSelectedSla = () => {
  const { logisticInfo, loading } = useLogisticInfos();

  const selectedSla = logisticInfo?.[logisticInfo?.length - 1]?.selectedSla;

  return { selectedSla, loading };

}

export default useSelectedSla