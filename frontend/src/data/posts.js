export const categories = [
  { id: 1, name: 'Self-Discovery', slug: 'self-discovery' },
  { id: 2, name: 'Relationships', slug: 'relationships' },
  { id: 3, name: 'Culture', slug: 'culture' },
  { id: 4, name: 'Mental Health', slug: 'mental-health' },
];

export const authors = [
  {
    id: 1,
    name: 'Jamie Lee',
    slug: 'jamie-lee',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Jamie writes about self-discovery, travel, and finding meaning in ordinary moments. Former journalist, full-time wanderer.',
  },
  {
    id: 2,
    name: 'Alex Morgan',
    slug: 'alex-morgan',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Alex is an essayist covering culture, relationships, and the quiet revolutions happening in everyday life.',
  },
];

export const posts = [
  {
    id: 1,
    slug: '10-things-you-learn-traveling-alone',
    title: '10 Things You Learn About Yourself When You Travel Alone',
    category: categories[0],
    author: authors[0],
    date: 'January 15, 2024',
    image: 'https://images.unsplash.com/photo-1768410318055-e37e9a919ddf?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>There is a version of yourself that only appears when no one is watching. When you board a train in a country whose language you don't speak, when you sit alone at a restaurant table meant for two, when you get completely lost and have to figure it out entirely on your own — that is when you meet the truest version of who you are.</p>
      <p>Traveling alone is one of the most honest things a person can do. You cannot perform for someone else. You cannot defer to your travel companion's opinion on where to eat, what to see, whether to stay or go. Every decision is yours. Every misstep is yours. Every small triumph belongs entirely to you.</p>
      <h2>1. You are more capable than you think</h2>
      <p>Before my first solo trip, I had never navigated a foreign airport by myself. I was convinced I would miss every connection, lose my passport, and end up stranded. I didn't. And that small discovery — that I could figure things out in real time — quietly rewired something in me.</p>
      <h2>2. Silence is not something to fear</h2>
      <p>We fill our lives with noise. Podcasts during commutes. Music while cooking. The TV on in the background not because we want to watch it but because the quiet feels like something might crawl into it. Traveling alone forces you to sit with the quiet, and after the initial discomfort, you start to hear yourself think again.</p>
      <h2>3. You have opinions you didn't know you had</h2>
      <p>Without another person to negotiate with, your own preferences become shockingly clear. You realize you actually hate guided tours. You realize you love waking up early to walk through markets before the crowds arrive. You realize you would rather spend an afternoon in a bookshop than visit the famous cathedral that everyone recommends.</p>
      <h2>4. Your social skills are better — and worse — than you thought</h2>
      <p>Some days you'll strike up a three-hour conversation with a stranger over dinner. Other days you will not utter a single word beyond "thank you" and feel completely fine about it. Both are revelations.</p>
      <h2>5. Fear shrinks when you walk toward it</h2>
      <p>There is a specific kind of bravery that grows quietly when you eat alone in a restaurant and don't feel the need to look at your phone the whole time. When you ask for directions in broken sentences and the person on the other end helps you anyway. Fear is mostly a story we tell ourselves before we've tried the thing.</p>
      <p>The rest of the list writes itself on the road. And that, perhaps, is the whole point — you won't know what you'll learn until you go.</p>
    `,
  },
  {
    id: 2,
    slug: 'stopped-waiting-for-life-to-begin',
    title: 'I Finally Stopped Waiting For My Life To Begin',
    category: categories[0],
    author: authors[1],
    date: 'January 22, 2024',
    image: 'https://images.unsplash.com/photo-1643305861243-8bd64bac57da?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>For a long time, I was living in the conditional tense. <em>When I finish this degree, I'll start doing the things I love. When I get the promotion, I'll finally feel settled. When I find the right person, everything will click into place.</em> My actual life — the one happening right now, today, in the unglamorous present — was just the waiting room before my real life started.</p>
      <p>I'm not sure when I first noticed the pattern. Maybe it was the third consecutive January that I made a list of everything I'd do differently "this year." Maybe it was the realization that the years were going by and the hypothetical future I was waiting for kept shifting, kept staying just out of reach, kept requiring one more prerequisite before it could begin.</p>
      <h2>The waiting room is not a phase. It is a choice.</h2>
      <p>The brutal truth is that no moment is ever going to tap you on the shoulder and announce itself as the one you've been waiting for. There is no magic threshold where life officially begins. There is only the day you're in, the choices available to you right now, and whether or not you decide to engage with them.</p>
      <p>I started small. I signed up for the pottery class I'd been meaning to take for two years. I texted the friends I'd been meaning to call. I started writing again — not because I had anything important to say, but because I'd been telling myself I'd start writing when I had something important to say, and I'd been waiting three years for that feeling to arrive.</p>
      <h2>The life you want is built in the in-between moments</h2>
      <p>What I've learned is that the big moments — the ones you imagine will change everything — are made possible by the accumulation of ordinary ones. The Sunday mornings you spend doing something you love instead of doomscrolling. The conversation you choose to have instead of avoid. The small, unglamorous choice to show up for the version of your life that already exists.</p>
      <p>Stop waiting. This is it. This is the beginning you've been looking for.</p>
    `,
  },
  {
    id: 3,
    slug: 'fall-in-love-with-right-person',
    title: 'This Is What It Feels Like To Fall In Love With The Right Person',
    category: categories[1],
    author: authors[0],
    date: 'February 1, 2024',
    image: 'https://images.unsplash.com/photo-1667053511715-69ccb1afb424?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>It doesn't feel the way the movies told you it would. There is no dramatic airport confession. No single moment where everything shifts. Instead it arrives quietly — in the way they remember how you take your coffee, in the easy silence that stretches between conversations without feeling like anything needs to fill it.</p>
      <p>Loving the right person is less like falling and more like arriving somewhere you didn't know you were heading. You look around one day and realize: this is what it's supposed to feel like. Not the adrenaline of the unknown, but the deep exhale of someone finally safe.</p>
      <h2>It is easy in a way that used to feel boring</h2>
      <p>For a long time, I confused chaos for passion. If it didn't feel urgent and uncertain, if my heart wasn't racing with the anxiety of not knowing where I stood, it didn't count as real love. The right person teaches you that ease is not a sign of complacency — it is evidence of something that actually works.</p>
      <h2>They make space for you to be entirely yourself</h2>
      <p>You don't edit yourself around them. You don't perform a more polished version of your personality. You bring your actual opinions, your strange habits, your bad days, your least impressive moments — and they're still there. Not despite those things, but with them.</p>
      <h2>You want to be better, not because you're not enough</h2>
      <p>There is a difference between someone who makes you feel like you should change and someone who makes you want to grow. The right person doesn't make you feel lacking. They make you feel so held that expansion becomes possible.</p>
      <p>It won't look exactly like this for everyone. But I think that's the point — when it's the right person, you stop trying to match it to a template. You just know, quietly and without drama, that you've found something true.</p>
    `,
  },
  {
    id: 4,
    slug: 'people-you-need-to-stop-making-excuses-for',
    title: 'The People You Need To Stop Making Excuses For',
    category: categories[1],
    author: authors[1],
    date: 'February 10, 2024',
    image: 'https://images.unsplash.com/photo-1767981235710-ab9f976c5c90?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>You know the ones. The ones whose behavior you've spent years narrating for other people. <em>They're going through a lot right now. That's just how they are. They didn't mean it that way. You have to understand where they come from.</em> You've become an expert at reframing, softening, explaining. What you haven't noticed is how much energy that takes.</p>
      <p>There is a kind of loyalty that slowly becomes self-abandonment. It starts as generosity — you are extending grace, which is a good thing — and gradually becomes a habit of prioritizing someone else's comfort over your own reality. You stop trusting your own reactions because you're so busy translating theirs.</p>
      <h2>The person who always needs one more chance</h2>
      <p>We all deserve grace when we mess up. But there is a difference between someone who is genuinely trying to do better and someone who has learned that your forgiveness is unconditional — and has started relying on it. If you have extended the same grace to the same person for the same thing more than twice, that is no longer grace. That is a pattern.</p>
      <h2>The one who only shows up when they need something</h2>
      <p>It takes a while to notice because you value being there for people. But look back at the last six months. Who reaches out when things are hard for them? Who is suddenly absent when things are hard for you? Who celebrates your wins with the same energy you celebrate theirs?</p>
      <h2>The friend who makes you smaller</h2>
      <p>They don't do it loudly. They do it through a well-timed comment about your choices, a subtle dismissal of your ambitions, an invisible ceiling they hold over your head. You leave their company feeling slightly less than you did when you arrived, and you've learned to call this "honesty" or "groundedness." It isn't.</p>
      <p>Letting go is not abandonment. It is the recognition that your energy is finite and deserves to go toward people who will actually receive it.</p>
    `,
  },
  {
    id: 5,
    slug: 'why-your-twenties-are-supposed-to-feel-like-a-mess',
    title: 'Why Your Twenties Are Supposed To Feel Like A Mess',
    category: categories[2],
    author: authors[0],
    date: 'February 20, 2024',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>Here is something nobody says out loud enough: feeling lost in your twenties is not a symptom of failure. It is developmental. It is exactly what is supposed to be happening, and our cultural obsession with curated success stories — the founder who exited at 26, the writer whose debut novel sold at 23 — has convinced an entire generation that confusion is a flaw rather than a stage.</p>
      <p>Your twenties are the first decade of your life where you are genuinely responsible for constructing who you are. Before this, your identity was largely handed to you: your family, your school, your hometown, your social group. In your twenties you have to actually decide. And deciding is hard and slow and full of wrong turns, and that is not a bug in the system. That is the system.</p>
      <h2>You are supposed to try things that don't work out</h2>
      <p>The job that taught you exactly what you don't want to do with your life is not a waste of your twenties. The city you moved to and hated is not a mistake — it is information. The relationship that ended badly clarified something essential about what you need. None of this is detour. This is the route.</p>
      <h2>The comparison is the problem, not the timeline</h2>
      <p>Social media has made it functionally impossible to move through an uncertain chapter of life without feeling like everyone else has already figured it out. They haven't. The people posting highlight reels at 25 are doing exactly what you're doing — trying to make sense of things. They've just learned to photograph only the certain parts.</p>
      <h2>Uncertainty is not a crisis</h2>
      <p>At 23 you are not behind. You are not a cautionary tale. You are a person in the middle of becoming something — and that process, uncomfortable and unresolved, is exactly what makes the decades that follow worth having.</p>
    `,
  },
  {
    id: 6,
    slug: 'letter-to-anyone-who-is-struggling',
    title: 'A Letter To Anyone Who Is Struggling Right Now',
    category: categories[3],
    author: authors[1],
    date: 'March 1, 2024',
    image: 'https://images.unsplash.com/photo-1771476831164-589aa954b165?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>I don't know what your specific version of hard looks like. Maybe it's the slow erosion of a relationship you thought would last. Maybe it's the gap between where you are and where you thought you'd be by now. Maybe it's something you haven't told anyone because you don't have the words for it yet, or because you're afraid that saying it out loud will make it more real.</p>
      <p>Whatever it is: it's valid. The scale of your struggle doesn't need to be measured against anyone else's. Hard is hard. Tired is tired. And you don't owe anyone a performance of being fine.</p>
      <h2>You are allowed to not be okay</h2>
      <p>This is something we say without really meaning it. We say it and then we ask someone how they're doing and accept "good" as a complete answer. We live in a culture that rewards high-functioning and punishes visible struggle. So when you're not okay, you learn to hide it efficiently, to carry it quietly, to schedule your falling apart for later when no one is watching.</p>
      <p>But the weight of constant maintenance is its own form of exhaustion. And the people who love you — the real ones — they want to know.</p>
      <h2>Getting through it doesn't have to look heroic</h2>
      <p>Sometimes getting through a hard season looks like showering. Making one phone call you've been dreading. Eating something real. Sitting outside for ten minutes. These aren't small things disguised as big things — they actually are big things, when the circumstances are what they are.</p>
      <h2>This chapter will not last forever</h2>
      <p>I can't promise when it gets better. I can't promise it gets better in the way you're hoping. But nothing — not grief, not confusion, not the specific flavor of loneliness you're carrying right now — nothing stays exactly the same. You are moving through this, even when it feels like you're standing still. Keep going. That's all. Just keep going.</p>
    `,
  },
  {
    id: 7,
    slug: 'we-need-to-talk-about-how-tired-we-all-are',
    title: 'We Need To Talk About How Tired We All Are',
    category: categories[3],
    author: authors[0],
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>Not sleepy-tired. The other kind. The kind that a good night's sleep doesn't touch. The kind that follows you into the weekend and sits across from you at Sunday brunch and still hasn't left by Monday morning. The bone-deep, low-level exhaustion that has become so constant it no longer registers as unusual. We've stopped calling it burnout because the word has been worn smooth. We've started calling it "a lot going on" or "just busy" or nothing at all.</p>
      <p>I've been thinking about this for a while. About why so many people I know — across different jobs, different cities, different life stages — seem to be running at a deficit. Not dramatically, not in a way that makes headlines, but quietly, sustainably, like something has been draining in the background for so long that they've forgotten what full even feels like.</p>
      <h2>We have normalized a pace that is not sustainable</h2>
      <p>The expectation that productivity should be constant — that rest requires earning, that ambition is a virtue and stillness a failure — is not a natural human state. It is a cultural one. And it is making us unwell in ways that are hard to measure because the symptoms look so much like ordinary life.</p>
      <h2>Connection has become logistically complex</h2>
      <p>There is a specific kind of lonely that comes from being technically surrounded by people while feeling fundamentally unseen. We have more ways to communicate than any previous generation and somehow less time to actually talk. Our friendships have shifted from spontaneous to scheduled, from deep to managed. We are all circling each other at a distance and calling it being connected.</p>
      <h2>Permission to slow down</h2>
      <p>I'm not offering a solution here. What I want to offer instead is acknowledgment: you are not weak for being tired. You are not broken. You are a person navigating an unusually demanding moment in history, doing the best you can with whatever reserves you have left. Rest is not a reward. It is a requirement. And you don't have to earn it.</p>
    `,
  },
  {
    id: 8,
    slug: 'we-all-need-to-learn-to-be-bored-again',
    title: 'We All Need To Learn How To Be Bored Again',
    category: categories[2],
    author: authors[1],
    date: 'March 20, 2024',
    image: 'https://images.unsplash.com/photo-1676802917823-3768bf66311d?w=700&q=80',
    imageCaption: 'Photo by Unsplash',
    content: `
      <p>There is a short window of time — between picking up your phone and your lock screen greeting you — that most of us never experience anymore. The moment used to last minutes, sometimes longer. Your mind would wander. You'd think about something that had been bothering you, or solve a problem you hadn't consciously been working on, or simply sit inside the experience of existing without an agenda. That window has been engineered closed.</p>
      <p>I don't think the problem is screens, exactly, or social media, or even the apps specifically designed to maximize your engagement. The problem is that we have lost our tolerance for unoccupied time. Boredom has been rebranded as a failure of stimulation rather than what it actually is: the mental state that precedes creativity, insight, and genuine rest.</p>
      <h2>Boredom is not the problem. It is the space before the solution.</h2>
      <p>Study after study has found that mind-wandering — the kind that happens when you're bored, when you're doing something automatic and low-stakes, when your conscious mind is quiet — is associated with creative problem-solving, emotional processing, and the consolidation of memory. We have swapped it out for scrolling and called it efficiency.</p>
      <h2>What we're losing</h2>
      <p>There is a texture to a day that is allowed to have idle moments in it. The commute where you watch people instead of your phone. The walk without AirPods. The ten minutes in a waiting room where your mind does its own thing. These moments feel minor, but they accumulate into something important: a sense of your own interiority, of having thoughts that were generated by you rather than by an algorithm.</p>
      <h2>How to start</h2>
      <p>Leave your phone in your pocket the next time you're standing in a queue. Sit with the discomfort for a minute. Notice what your mind reaches for when there is nothing to reach for. It will be rusty. That's fine. Like most things worth doing, it gets easier with practice. The capacity to be bored is not a flaw in your character. It might be the most important thing you can reclaim.</p>
    `,
  },
];

export default posts;
