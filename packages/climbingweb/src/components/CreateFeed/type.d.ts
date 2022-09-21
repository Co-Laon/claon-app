export interface PostData {
  centerId: string;
  climbingHistories: ClimbingHistories[];
  content: string;
  contentsList: { url: string }[];
}

export interface ClimbingHistories {
  climbingCount: number;
  holdId: string;
}
