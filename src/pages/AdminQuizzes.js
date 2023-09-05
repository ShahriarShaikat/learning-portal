import Navbar from "../components/nav/Navbar";
import AdminQuizList from "../components/list/AdminQuizList";
import { useState } from "react";
import AdminAddQuizForm from "../components/form/AdminAddQuizForm";

function AdminQuizzes() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      {showModal && <AdminAddQuizForm setShowModal={setShowModal} />}
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                className="btn ml-auto"
                onClick={() => setShowModal(true)}
              >
                Add Quiz
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                  </tr>
                </thead>

                <AdminQuizList />
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AdminQuizzes;
