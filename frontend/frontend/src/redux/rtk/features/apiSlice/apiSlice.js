import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  credentials: "include",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery(
        `/user/refresh-token`,
        api,
        extraOptions
      );
      if (refreshResult.data) {
        localStorage.setItem("access-token", refreshResult.data.token);

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.clear();
        window.location.replace("/admin/auth/login");
        return undefined;
      }
    } catch (error) {
      localStorage.clear();
      window.location.replace("/admin/auth/login");
      return undefined;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 0,

  tagTypes: [
    "TaskTimes",
    "TaskStatusAll",
    "TaskStatusById",
    "TaskStatus",
    "TaskPriority",
    "TaskPriorities",
    "TaskDependency",
    "ProjectTeams",
    "ProjectTeam",
    "ProjectTeamsById",
    "ProjectTask",
    "ProjectAll",
    "Projects",
    "Project",
    "Milestones",
    "MilestoneById",
    "Milestone",
    "AssignedTasks",
    "Task",
    "Tasks",
    "Payrolls",
    "PaySlips",
    "PaySlipsByMonth",
    "PayrollUser",
    "Lead",
    "Leads",
    "LeadsAll",
    "LeadSource",
    "LeadSources",
    "LeadSourceAll",
    "AssignedTasks",
    "Milestones",
    "MilestoneById",
    "Milestone",
    "TaskPriority",
    "TaskPriorities",
    "Projects",
    "Project",
    "ProjectAll",
    "ProjectTasks",
    "ProjectTask",
    "TaskStatusById",
    "Tasks",
    "ProjectAll",
    "ProjectTeams",
    "ProjectTeam",
    "TaskDependency",
    "TaskStatus",
    "TaskStatusAll",
    "TaskStatusById",
    "TaskTimes",
  ],
  endpoints: (builder) => ({}),
});
