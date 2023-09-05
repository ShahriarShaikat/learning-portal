function ModalHeader({ title }) {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
      <h3 className="text-3xl font-semibold text-gray-600">{title}</h3>
    </div>
  );
}
export default ModalHeader;
