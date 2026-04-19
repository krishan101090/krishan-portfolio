export function renderOgImage(profile) {
  const name = profile?.person?.name || 'Portfolio'
  const initials = profile?.person?.initials || 'KM'
  const jobTitle = profile?.person?.jobTitle || 'Software Engineer'
  const tagline =
    profile?.person?.tagline ||
    'Shipping AI-native products with spec-driven development.'
  const availability = profile?.person?.availability || 'OPEN FOR PROJECTS'
  const location = profile?.person?.location || 'Remote'
  const years = profile?.person?.yearsExperience
  const skills =
    profile?.person?.skills?.slice(0, 6) ||
    ['Next.js', 'React', 'TypeScript', 'LangChain', 'OpenAI', 'AWS']

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#04050a',
        backgroundImage:
          'radial-gradient(circle at 15% 15%, rgba(0,229,255,0.28), transparent 45%), radial-gradient(circle at 85% 85%, rgba(255,46,154,0.22), transparent 45%)',
        color: '#e8ecff',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 22,
              color: '#9aa3b2',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: 14 },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: 12,
                          height: 12,
                          background: '#b4ff39',
                          borderRadius: 999,
                          boxShadow: '0 0 16px #b4ff39',
                        },
                      },
                    },
                    availability,
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', color: '#00e5ff' },
                  children: `${initials}.dev`,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 16 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 28,
                    color: '#00e5ff',
                    fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  },
                  children: jobTitle,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 110,
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    display: 'flex',
                  },
                  children: name,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 34,
                    lineHeight: 1.3,
                    color: '#c7ccd9',
                    maxWidth: 960,
                    display: 'flex',
                  },
                  children: tagline,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                  },
                  children: skills.map((s) => ({
                    type: 'div',
                    props: {
                      style: {
                        padding: '10px 18px',
                        border: '1px solid rgba(0,229,255,0.35)',
                        borderRadius: 999,
                        color: '#00e5ff',
                        fontSize: 22,
                        fontFamily: 'JetBrains Mono, monospace',
                        display: 'flex',
                      },
                      children: s,
                    },
                  })),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 22,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#9aa3b2',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', gap: 24 },
                        children: [
                          years
                            ? {
                                type: 'div',
                                props: {
                                  style: { color: '#b4ff39', display: 'flex' },
                                  children: `${years}+ YEARS`,
                                },
                              }
                            : null,
                          {
                            type: 'div',
                            props: { style: { display: 'flex' }, children: location.toUpperCase() },
                          },
                        ].filter(Boolean),
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { color: '#ff2e9a', display: 'flex' },
                        children: '$ hire --now',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}
