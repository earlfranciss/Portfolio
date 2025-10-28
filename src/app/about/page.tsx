export default function About() {
    return (
        <section id="about" className="scroll-mt-52  space-y-6">

            <div className=" text-lg mt-20 m-9 p-8 text-center text-gray-400 leading-relaxed">
                I'm a <i className="text-slate-200 font-semibold">developer</i> by day and a
                <i className="text-slate-200 font-semibold"> lifter</i> by habit, based in
                <span className="text-slate-200 font-normal"> Cebu, Philippines</span>. <br />
                Currently <span className="text-slate-200 font-semibold">building modern software experiences</span> —
                passionate about writing <i className="text-slate-200 font-semibold">clean, efficient code </i>
                and <span className="text-slate-200 font-normal">lifting heavy circles</span> outside the editor.

                <img alt="tech"
                    src="https://skillicons.dev/icons?i=dotnet,react,angular,tailwind,py,flask,vue,ts,js,figma,mongodb,azure,docker,git,github"
                    className="items-center mt-8" />

<div className="flex justify-center items-center gap-6 pt-8">
  {/* Say Hello button */}
  <div className="flex items-center gap-2 rounded border-2 border-gray-400/20 text-sm px-4 py-2 cursor-pointer bg-gray-700/40 hover:bg-blue-600/40 hover:border-blue-400 text-gray-300 hover:text-gray-100 hover:scale-105 transition-all duration-300 font-semibold">
        <span>Say Hello</span>
        <span className="animate-wave">👋</span>
  </div>

  {/* Availability status */}
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_3px_rgba(34,197,94,0.6)]" />
    <h4 className="text-xs text-gray-300 font-medium">Available for projects</h4>
  </div>
</div>

            </div>
        </section>
    )
}