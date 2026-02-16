export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-purple-900">Contact & Coaching Staff</h1>
        <p className="mt-2 text-gray-600">Meet the dedicated coaching staff leading our Hounds to excellence.</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-purple-50 px-4 py-2 text-sm">
          <span className="font-semibold text-purple-800">SportsYou Code:</span>
          <span className="font-mono font-bold text-purple-600">2RPP-VGP8</span>
        </div>
      </div>

      {/* Region Champions Banner */}
      <div className="mb-10 rounded-xl bg-gradient-to-r from-purple-900 to-purple-700 px-6 py-4 text-center text-white">
        <p className="font-heading text-lg font-bold uppercase tracking-wide">
          2022, 2023, 2024, 2025 Region Champions
        </p>
        <p className="mt-1 text-sm text-purple-200">BE HYDRATED! BE READY TO RUN! BE ON TIME!</p>
      </div>

      {/* Head Coach */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">High School Coaches</h2>

        <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-gold-50 p-3 text-gold-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <span className="inline-block rounded-full bg-purple-100 px-3 py-0.5 text-xs font-semibold text-purple-700 mb-2">Head Coach</span>
              <h3 className="text-xl font-bold text-purple-900">Coach Geoff Moore</h3>
              <p className="text-sm text-purple-500 font-medium">High School Head Coach | 2017 &ndash; Present</p>
            </div>
          </div>

          <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Coach Geoff Moore brings a wealth of competitive experience and championship-level expertise to the Jones County Cross Country program. A Vidalia, Georgia native, Coach Moore's journey from accomplished high school runner to dedicated educator and coach spans over three decades.
            </p>
            <p>
              As a student-athlete at Robert Toombs Christian Academy (1984-1987), Coach Moore dominated distance running at the state level, capturing three consecutive state championships in both the 1-mile and 2-mile events.
            </p>
            <p>
              At Brevard College (1987-1988), he helped lead his team to back-to-back NJCAA Cross Country National Championships and earned All-American honors in cross country.
            </p>
            <p>
              At Clemson University (1989-1990), he earned All-Atlantic Coast Conference honors in cross country and contributed to ACC Championship teams in both indoor and outdoor track.
            </p>
          </div>

          {/* PRs and Coaching Success */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-purple-50 p-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-purple-700 mb-3">Personal Records</h4>
              <ul className="space-y-1.5 text-sm">
                <li className="flex justify-between"><span className="text-gray-600">1 Mile</span><span className="font-semibold text-purple-900">4:08</span></li>
                <li className="flex justify-between"><span className="text-gray-600">5K</span><span className="font-semibold text-purple-900">14:08</span></li>
                <li className="flex justify-between"><span className="text-gray-600">10K</span><span className="font-semibold text-purple-900">30:10</span></li>
              </ul>
            </div>
            <div className="rounded-lg bg-gold-50 p-4">
              <h4 className="text-sm font-bold uppercase tracking-wide text-gold-700 mb-3">Coaching Success</h4>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li>Head Coach since 2017</li>
                <li>Region Championships: 2022, 2023, 2024, 2025</li>
                <li>Multiple State Qualifiers</li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Georgia College graduate with a degree in education. Currently teaches physical education at Turner Woods Elementary and has been coaching in Jones County since 2011.
          </p>
        </div>
      </section>

      {/* Assistant Coaches */}
      <section className="mb-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-600 mb-2">Assistant Coach</span>
            <h3 className="text-lg font-bold text-purple-900">Coach Tommy Robinson</h3>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Coach Robinson brings valuable experience and expertise to the Jones County Cross Country program, working closely with Coach Moore to develop athletes across all distance events.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-purple-500">Focus: Training Development & Athlete Mentoring</p>
          </div>

          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-600 mb-2">Assistant Coach &ndash; Administration</span>
            <h3 className="text-lg font-bold text-purple-900">Coach Jason Waters</h3>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Coach Waters handles the administrative backbone of the program, ensuring smooth operations and financial management for the team's success.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-purple-500">Focus: Meet Management, Budgeting & Admin Duties</p>
          </div>
        </div>
      </section>

      {/* Middle School Coaches */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">Middle School Coaches</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-600 mb-2">Middle School Head Coach</span>
            <h3 className="text-lg font-bold text-purple-900">Coach Meddie Fuller</h3>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Coach Meddie Fuller leads the Middle School cross country program, developing young athletes and preparing them for high school competition. With a focus on building strong fundamentals and a love for the sport, Coach Fuller helps young runners discover their potential.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-purple-500">Focus: Youth Development & Fundamentals</p>
          </div>

          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <span className="inline-block rounded-full bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-600 mb-2">Middle School Assistant Coach</span>
            <h3 className="text-lg font-bold text-purple-900">Coach Gunner Kent</h3>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              Coach Gunner Kent assists with the Middle School program, focusing on building strong foundations for future success. He works closely with athletes on training support and helps create a positive team environment for young runners.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-purple-500">Focus: Athlete Development & Training Support</p>
          </div>
        </div>
      </section>

      {/* Program Achievements */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">Program Achievements</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { stat: '8', label: 'Region Championships', sub: '(2022-2025)' },
            { stat: '25+', label: 'All-Region Selections', sub: '' },
            { stat: '15+', label: 'State Meet Qualifiers', sub: '' },
            { stat: '100%', label: 'College Bound Athletes', sub: '' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-purple-100 bg-white p-5 text-center shadow-sm">
              <p className="font-heading text-3xl font-bold text-purple-700">{item.stat}</p>
              <p className="mt-1 text-sm font-medium text-gray-700">{item.label}</p>
              {item.sub && <p className="text-xs text-gray-500">{item.sub}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* School Address */}
      <section className="mb-10">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-purple-900 mb-6">School Info</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-lg bg-purple-50 p-2.5 text-purple-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-900">School Address</h3>
                <address className="mt-3 not-italic text-gray-700 leading-relaxed">
                  Jones County High School<br />
                  178 Greyhound Way<br />
                  Gray, GA 31032
                </address>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-lg bg-purple-50 p-2.5 text-purple-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-900">Program Info</h3>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  Jones County Greyhounds Cross Country competes in GHSA classification.
                  For questions about the program, contact the athletic department at Jones County High School.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
