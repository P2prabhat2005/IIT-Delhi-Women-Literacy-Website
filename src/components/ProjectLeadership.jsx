import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { getTeamDirectory } from '../data/team.js';
import EditableImageSlot from './EditableImageSlot.jsx';
import PersistentImageSlot from './PersistentImageSlot.jsx';
import SectionTitle from './SectionTitle.jsx';

function EmptyState({ tone = 'light' }) {
  const isDark = tone === 'dark';

  return (
    <div
      className={`rounded-[1.5rem] border border-dashed p-8 text-center text-sm font-semibold ${
        isDark
          ? 'border-white/15 bg-white/[0.05] text-slate-300'
          : 'border-slate-300 bg-slate-50 text-slate-600'
      }`}
    >
      Team members will be added soon.
    </div>
  );
}

function TeamPhotoSlot({ member, tone = 'light', aspectRatio = 'aspect-[4/3]', compact = false }) {
  return (
    <EditableImageSlot
      image={member.photo?.url || null}
      title="Profile Photo"
      alt={member.isPlaceholder ? `${member.designation} profile photograph placeholder` : `${member.fullName} profile photograph`}
      aspectRatio={aspectRatio}
      compact={compact}
      emptyClassName={tone === 'dark' ? 'bg-white/[0.07]' : 'bg-red-50'}
      emptyTextClassName={tone === 'dark' ? 'text-slate-200' : ''}
      className={
        tone === 'dark'
          ? 'h-full w-full rounded-[1.25rem] border border-white/15 bg-white/[0.07] shadow-sm'
          : 'h-full w-full rounded-[1.25rem] border border-red-100 bg-red-50 shadow-sm'
      }
    />
  );
}

function LeadershipCategory({ category }) {
  return (
    <>
      <SectionTitle
        align="center"
        eyebrow="Project Bharti"
        id="project-leadership-title"
        description={category?.description || 'Faculty leadership at IIT Delhi providing academic direction for Project Bharti.'}
      >
        {category?.title || 'Project Leadership'}
      </SectionTitle>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:mt-12 md:grid-cols-2">
        {category?.members?.length ? (
          category.members.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-2xl ${
                member.isActive ? '' : 'opacity-60'
              }`}
            >
              <TeamPhotoSlot member={member} />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-red-800">{member.designation}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">{member.fullName}</h3>
              <p className="mt-4 leading-7 text-slate-600">{category.description}</p>
            </motion.article>
          ))
        ) : (
          <div className="md:col-span-2">
            <EmptyState />
          </div>
        )}
      </div>
    </>
  );
}

function DevelopmentMemberCard({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 text-center transition duration-300 hover:bg-white/[0.11] ${
        member.isActive ? '' : 'opacity-60'
      }`}
    >
      <div className="mx-auto w-full max-w-[11rem]">
        <TeamPhotoSlot member={member} tone="dark" aspectRatio="aspect-square" compact />
      </div>
      <h4 className="mt-4 text-xl font-semibold text-white">{member.fullName}</h4>
      <p className="mt-1.5 text-sm font-semibold text-red-100">{member.designation}</p>
    </motion.article>
  );
}

function DevelopmentTeamGroups({ category }) {
  const membersById = Object.fromEntries(category.members.map((member) => [member.id, member]));
  const groups = category.memberGroups?.length
    ? category.memberGroups.map((group) => ({
        ...group,
        members: group.memberIds.map((id) => membersById[id]).filter(Boolean),
      }))
    : [{ id: 'all', title: null, members: category.members }];

  if (!category.members.length) {
    return (
      <div className="mt-6">
        <EmptyState tone="dark" />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-10">
      {groups.map((group) => (
        <div key={group.id}>
          {group.title ? (
            <h4 className="text-center text-lg font-semibold tracking-wide text-red-100 md:text-left">
              {group.title}
            </h4>
          ) : null}
          <div
            className={`grid gap-4 sm:grid-cols-2 ${
              group.members.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } ${group.title ? 'mt-5' : ''}`}
          >
            {group.members.map((member, index) => (
              <DevelopmentMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DarkCategory({ category }) {
  const isDevelopmentTeam = category.slug === 'development-team';

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.55 }}
      className={`mt-14 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8 ${
        category.isActive ? '' : 'opacity-70'
      }`}
    >
      <div className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-3xl md:text-left">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-red-200">
          <Sparkles size={15} aria-hidden="true" />
          Project Bharti
        </p>
        <h3 className="mt-2.5 text-3xl font-semibold leading-tight md:mt-3">
          {category.title}
        </h3>
        {category.description ? (
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300 md:mt-3.5">{category.description}</p>
        ) : null}
      </div>

      {isDevelopmentTeam ? (
        <PersistentImageSlot
          ownerId="dev-team-group"
          title="Official Project Photograph"
          alt="Research and implementation team group photograph"
          aspectRatio="aspect-[16/7]"
          emptyClassName="bg-white/[0.07]"
          emptyTextClassName="text-slate-200"
          className="mt-8 w-full rounded-[1.5rem] border border-white/15 bg-white/[0.07]"
        />
      ) : null}

      {isDevelopmentTeam ? (
        <DevelopmentTeamGroups category={category} />
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {category.members.length ? (
            category.members.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 transition duration-300 hover:bg-white/[0.11] ${
                  member.isActive ? '' : 'opacity-60'
                }`}
              >
                <TeamPhotoSlot member={member} tone="dark" />
                <h4 className="mt-5 text-xl font-semibold text-white">{member.fullName}</h4>
                <p className="mt-2 text-sm font-semibold text-red-100">{member.designation}</p>
              </motion.article>
            ))
          ) : (
            <div className="md:col-span-3">
              <EmptyState tone="dark" />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectLeadership() {
  const categories = useMemo(() => getTeamDirectory(), []);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.displayOrder - b.displayOrder),
    [categories],
  );
  const leadershipCategory =
    sortedCategories.find((category) => category.slug === 'project-leadership') || sortedCategories[0] || null;
  const secondaryCategories = sortedCategories.filter((category) => category.id !== leadershipCategory?.id);

  return (
    <section aria-labelledby="project-leadership-title" className="section bg-white">
      <div className="site-container">
        {sortedCategories.length ? (
          <>
            <LeadershipCategory category={leadershipCategory} />
            {secondaryCategories.map((category) => (
              <DarkCategory key={category.id} category={category} />
            ))}
          </>
        ) : (
          <>
            <SectionTitle
              align="center"
              eyebrow="Project Bharti"
              id="project-leadership-title"
              description="Team categories and members will appear here once they are published."
            >
              Project Team
            </SectionTitle>
            <div className="mt-12">
              <EmptyState />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
