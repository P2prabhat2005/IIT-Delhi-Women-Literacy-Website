import { motion } from 'framer-motion';
import { Pencil, Plus, Sparkles, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTeamDirectory } from '../hooks/useTeamDirectory.js';
import AccessibleModal from './AccessibleModal.jsx';
import EditableImageSlot from './EditableImageSlot.jsx';
import PersistentImageSlot from './PersistentImageSlot.jsx';
import SectionTitle from './SectionTitle.jsx';

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function AdminButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function EmptyState({ isAdminMode, tone = 'light' }) {
  const isDark = tone === 'dark';

  return (
    <div
      className={`rounded-[1.5rem] border border-dashed p-8 text-center text-sm font-semibold ${
        isDark
          ? 'border-white/15 bg-white/[0.05] text-slate-300'
          : 'border-slate-300 bg-slate-50 text-slate-600'
      }`}
    >
      {isAdminMode ? 'No team members yet. Use Admin controls to add the first member.' : 'Team members will be added soon.'}
    </div>
  );
}

function TeamPhotoSlot({ member, onRemovePhoto, onUploadPhoto, tone = 'light' }) {
  return (
    <EditableImageSlot
      image={member.photo?.url || null}
      onChange={(file) => {
        if (file) {
          onUploadPhoto(member.id, file);
        } else {
          onRemovePhoto(member.id);
        }
      }}
      title="Profile Photo"
      alt={`${member.fullName} profile photograph`}
      aspectRatio="aspect-[4/3]"
      emptyClassName={tone === 'dark' ? 'bg-white/[0.07]' : 'bg-red-50'}
      emptyTextClassName={tone === 'dark' ? 'text-slate-200' : ''}
      className={
        tone === 'dark'
          ? 'w-full rounded-[1.25rem] border border-white/15 bg-white/[0.07] shadow-sm'
          : 'w-full rounded-[1.25rem] border border-red-100 bg-red-50 shadow-sm'
      }
    />
  );
}

function CategoryControls({ category, onAddMember, onDeleteCategory, onEditCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      <AdminButton
        onClick={() => onAddMember(category)}
        className="border-white/15 bg-white/10 text-white hover:bg-white/15"
      >
        <Plus size={14} aria-hidden="true" />
        Add Member
      </AdminButton>
      <AdminButton
        onClick={() => onEditCategory(category)}
        className="border-white/15 bg-white/10 text-white hover:bg-white/15"
      >
        <Pencil size={14} aria-hidden="true" />
        Edit Category
      </AdminButton>
      <AdminButton
        onClick={() => onDeleteCategory(category)}
        className="border-white/15 bg-white/10 text-white hover:bg-white/15"
      >
        <Trash2 size={14} aria-hidden="true" />
        Delete
      </AdminButton>
    </div>
  );
}

function MemberControls({ member, onDeleteMember, onEditMember, tone = 'light' }) {
  const className =
    tone === 'dark'
      ? 'border-white/15 bg-white/10 text-white hover:bg-white/15'
      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <AdminButton onClick={() => onEditMember(member)} className={className}>
        <Pencil size={14} aria-hidden="true" />
        Edit
      </AdminButton>
      <AdminButton onClick={() => onDeleteMember(member)} className={className}>
        <Trash2 size={14} aria-hidden="true" />
        Delete
      </AdminButton>
    </div>
  );
}

function LeadershipCategory({ category, isAdminMode, teamActions }) {
  return (
    <>
      <SectionTitle
        align="center"
        eyebrow="Project Bharti"
        id="project-leadership-title"
        description={category?.description || 'Academic and implementation leadership guiding Project Bharti.'}
      >
        {category?.title || 'Project Leadership'}
      </SectionTitle>

      {isAdminMode ? (
        <div className="mt-6 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            <AdminButton
              onClick={() => teamActions.onAddMember(category)}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Plus size={14} aria-hidden="true" />
              Add Member
            </AdminButton>
            <AdminButton
              onClick={() => teamActions.onEditCategory(category)}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={14} aria-hidden="true" />
              Edit Category
            </AdminButton>
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
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
              <TeamPhotoSlot
                member={member}
                onRemovePhoto={teamActions.onRemovePhoto}
                onUploadPhoto={teamActions.onUploadPhoto}
              />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-red-800">{member.designation}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">{member.fullName}</h3>
              <p className="mt-4 leading-7 text-slate-600">{category.description}</p>
              {isAdminMode ? <MemberControls member={member} {...teamActions} /> : null}
            </motion.article>
          ))
        ) : (
          <div className="md:col-span-2">
            <EmptyState isAdminMode={isAdminMode} />
          </div>
        )}
      </div>
    </>
  );
}

function DarkCategory({ category, isAdminMode, teamActions }) {
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
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-red-200">
            <Sparkles size={15} aria-hidden="true" />
            Project Bharti
          </p>
          <h3 className="mt-3 text-3xl font-semibold">
            {isDevelopmentTeam ? `Meet the ${category.title}` : category.title}
          </h3>
          {category.description ? (
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">{category.description}</p>
          ) : null}
        </div>
        {isAdminMode ? <CategoryControls category={category} {...teamActions} /> : null}
      </div>

      {isDevelopmentTeam ? (
        <PersistentImageSlot
          ownerId="dev-team-group"
          title="Official Project Photograph"
          alt="Development team group photograph"
          aspectRatio="aspect-[16/7]"
          emptyClassName="bg-white/[0.07]"
          emptyTextClassName="text-slate-200"
          className="mt-8 w-full rounded-[1.5rem] border border-white/15 bg-white/[0.07]"
        />
      ) : null}

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
              <TeamPhotoSlot
                member={member}
                onRemovePhoto={teamActions.onRemovePhoto}
                onUploadPhoto={teamActions.onUploadPhoto}
                tone="dark"
              />
              <h4 className="mt-5 text-xl font-semibold text-white">{member.fullName}</h4>
              <p className="mt-2 text-sm font-semibold text-red-100">{member.designation}</p>
              {isAdminMode ? <MemberControls member={member} tone="dark" {...teamActions} /> : null}
            </motion.article>
          ))
        ) : (
          <div className="md:col-span-3">
            <EmptyState isAdminMode={isAdminMode} tone="dark" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CategoryEditorModal({ category, isOpen, mode, onClose, onSave }) {
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setFormState({
      title: category?.title || '',
      slug: category?.slug || '',
      description: category?.description || '',
      displayOrder: category?.displayOrder ?? 0,
      isActive: category?.isActive ?? true,
    });
  }, [category, isOpen]);

  if (!isOpen || !formState) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formState.title.trim();
    onSave({
      title,
      slug: formState.slug.trim() || slugify(title),
      description: formState.description.trim(),
      displayOrder: Number(formState.displayOrder) || 0,
      isActive: formState.isActive,
    });
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={mode === 'create' ? 'Add team category' : 'Edit team category'}
      overlayClassName="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 px-4 py-6"
      className="w-full max-w-lg rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-950">
          {mode === 'create' ? 'Add Team Category' : 'Edit Team Category'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
          aria-label="Close category editor"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category Name</span>
          <input
            required
            value={formState.title}
            onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Slug</span>
          <input
            value={formState.slug}
            onChange={(event) => setFormState((current) => ({ ...current, slug: event.target.value }))}
            placeholder="auto-generated-from-name"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</span>
          <textarea
            rows={3}
            value={formState.description}
            onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Display Order</span>
            <input
              type="number"
              value={formState.displayOrder}
              onChange={(event) => setFormState((current) => ({ ...current, displayOrder: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
            />
          </label>

          <label className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={formState.isActive}
              onChange={(event) => setFormState((current) => ({ ...current, isActive: event.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-red-800 focus:ring-red-800"
            />
            Active
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Save Category
          </button>
        </div>
      </form>
    </AccessibleModal>
  );
}

function MemberEditorModal({ categories, isOpen, member, mode, onClose, onSave, selectedCategory }) {
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setFormState({
      categoryId: member?.categoryId || selectedCategory?.id || categories[0]?.id || '',
      fullName: member?.fullName || '',
      designation: member?.designation || '',
      displayOrder: member?.displayOrder ?? 0,
      isActive: member?.isActive ?? true,
    });
  }, [categories, isOpen, member, selectedCategory]);

  if (!isOpen || !formState) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      categoryId: formState.categoryId,
      fullName: formState.fullName.trim(),
      designation: formState.designation.trim(),
      displayOrder: Number(formState.displayOrder) || 0,
      isActive: formState.isActive,
    });
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={mode === 'create' ? 'Add team member' : 'Edit team member'}
      overlayClassName="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 px-4 py-6"
      className="w-full max-w-lg rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-950">
          {mode === 'create' ? 'Add Team Member' : 'Edit Team Member'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
          aria-label="Close member editor"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Full Name</span>
          <input
            required
            value={formState.fullName}
            onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Designation</span>
          <input
            value={formState.designation}
            onChange={(event) => setFormState((current) => ({ ...current, designation: event.target.value }))}
            placeholder="Research Associate"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</span>
            <select
              value={formState.categoryId}
              onChange={(event) => setFormState((current) => ({ ...current, categoryId: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Display Order</span>
            <input
              type="number"
              value={formState.displayOrder}
              onChange={(event) => setFormState((current) => ({ ...current, displayOrder: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={formState.isActive}
            onChange={(event) => setFormState((current) => ({ ...current, isActive: event.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-red-800 focus:ring-red-800"
          />
          Active
        </label>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Save Member
          </button>
        </div>
      </form>
    </AccessibleModal>
  );
}

export default function ProjectLeadership() {
  const { isAdmin: isAdminMode } = useAuth();
  const team = useTeamDirectory({ includeInactive: isAdminMode });
  const [categoryEditor, setCategoryEditor] = useState(null);
  const [memberEditor, setMemberEditor] = useState(null);

  const sortedCategories = useMemo(
    () => [...team.categories].sort((a, b) => a.displayOrder - b.displayOrder),
    [team.categories],
  );
  const leadershipCategory =
    sortedCategories.find((category) => category.slug === 'project-leadership') || sortedCategories[0] || null;
  const secondaryCategories = sortedCategories.filter((category) => category.id !== leadershipCategory?.id);

  const teamActions = {
    onAddMember: (category) => setMemberEditor({ mode: 'create', category, member: null }),
    onEditMember: (member) => setMemberEditor({ mode: 'edit', category: null, member }),
    onDeleteMember: (member) => {
      if (window.confirm(`Delete ${member.fullName}? This cannot be undone.`)) {
        team.deleteMember(member.id);
      }
    },
    onEditCategory: (category) => setCategoryEditor({ mode: 'edit', category }),
    onDeleteCategory: (category) => {
      if (window.confirm(`Delete ${category.title} and all members in it? This cannot be undone.`)) {
        team.deleteCategory(category.id);
      }
    },
    onUploadPhoto: team.uploadPhoto,
    onRemovePhoto: team.removePhoto,
  };

  const handleSaveCategory = async (fields) => {
    const ok =
      categoryEditor.mode === 'create'
        ? await team.createCategory(fields)
        : await team.updateCategory(categoryEditor.category.id, fields);
    if (ok) setCategoryEditor(null);
  };

  const handleSaveMember = async (fields) => {
    const ok =
      memberEditor.mode === 'create'
        ? await team.createMember(fields)
        : await team.updateMember(memberEditor.member.id, fields);
    if (ok) setMemberEditor(null);
  };

  return (
    <section aria-labelledby="project-leadership-title" className="section bg-white">
      <div className="site-container">
        {isAdminMode ? (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <AdminButton
              onClick={() => setCategoryEditor({ mode: 'create', category: null })}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Plus size={14} aria-hidden="true" />
              Add Team Category
            </AdminButton>
          </div>
        ) : null}

        {team.validationMessage ? (
          <div role="alert" className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {team.validationMessage}
          </div>
        ) : null}

        {team.isLoading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-600">
            Loading team members...
          </div>
        ) : sortedCategories.length ? (
          <>
            <LeadershipCategory category={leadershipCategory} isAdminMode={isAdminMode} teamActions={teamActions} />
            {secondaryCategories.map((category) => (
              <DarkCategory key={category.id} category={category} isAdminMode={isAdminMode} teamActions={teamActions} />
            ))}
          </>
        ) : (
          <>
            <SectionTitle
              align="center"
              eyebrow="Project Bharti"
              id="project-leadership-title"
              description="Team categories and members will appear here once they are added."
            >
              Project Team
            </SectionTitle>
            <div className="mt-12">
              <EmptyState isAdminMode={isAdminMode} />
            </div>
          </>
        )}

      </div>

      <CategoryEditorModal
        isOpen={Boolean(categoryEditor)}
        mode={categoryEditor?.mode}
        category={categoryEditor?.category}
        onClose={() => setCategoryEditor(null)}
        onSave={handleSaveCategory}
      />
      <MemberEditorModal
        isOpen={Boolean(memberEditor)}
        mode={memberEditor?.mode}
        member={memberEditor?.member}
        selectedCategory={memberEditor?.category}
        categories={sortedCategories}
        onClose={() => setMemberEditor(null)}
        onSave={handleSaveMember}
      />
    </section>
  );
}
