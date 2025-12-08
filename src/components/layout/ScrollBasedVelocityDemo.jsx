import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "../ui/scroll-based-velocity"

export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative bg-[#f5f5f7] pb-5 font-plusjakarta flex w-full flex-col items-center justify-center overflow-hidden">
      <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Essentions Elturn
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Essentions Elturn
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#f5f5f7] to-[#f5f5f7]/0"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#f5f5f7] to-[#f5f5f7]/0"></div>
    </div>
  )
}
