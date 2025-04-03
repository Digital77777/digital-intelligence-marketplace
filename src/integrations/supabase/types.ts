export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_streams: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string | null
          duration: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          likes: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          likes?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          likes?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: []
      }
      ai_streams_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          stream_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          stream_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          stream_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_streams_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ai_streams_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_streams_comments_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "ai_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tools: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string | null
          id: string
          image_url: string | null
          name: string
          rationale: string | null
          required_tier: string
          use_cases: string[] | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          rationale?: string | null
          required_tier: string
          use_cases?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          rationale?: string | null
          required_tier?: string
          use_cases?: string[] | null
        }
        Relationships: []
      }
      business_insights: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string | null
          id: string
          industry: string | null
          is_public: boolean | null
          metrics: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          is_public?: boolean | null
          metrics?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          is_public?: boolean | null
          metrics?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_insights_access: {
        Row: {
          created_at: string
          id: string
          insight_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          insight_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          insight_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_insights_access_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "business_insights"
            referencedColumns: ["id"]
          },
        ]
      }
      course_feedback: {
        Row: {
          comment: string | null
          course_id: number
          created_at: string | null
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          course_id: number
          created_at?: string | null
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          course_id?: number
          created_at?: string | null
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_feedback_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string | null
          difficulty: string
          duration: number
          id: number
          image_url: string | null
          required_tier: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description?: string | null
          difficulty: string
          duration: number
          id?: number
          image_url?: string | null
          required_tier?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          duration?: number
          id?: number
          image_url?: string | null
          required_tier?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          required_tier: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          required_tier?: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          required_tier?: string
          slug?: string
        }
        Relationships: []
      }
      forum_groups: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_private: boolean
          member_count: number
          name: string
          tier_required: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_private?: boolean
          member_count?: number
          name: string
          tier_required?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_private?: boolean
          member_count?: number
          name?: string
          tier_required?: string
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          is_solution: boolean
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_solution?: boolean
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_solution?: boolean
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          category_id: string
          content: string
          created_at: string
          id: string
          is_locked: boolean
          is_pinned: boolean
          title: string
          updated_at: string
          user_id: string
          views: number
        }
        Insert: {
          category_id: string
          content: string
          created_at?: string
          id?: string
          is_locked?: boolean
          is_pinned?: boolean
          title: string
          updated_at?: string
          user_id: string
          views?: number
        }
        Update: {
          category_id?: string
          content?: string
          created_at?: string
          id?: string
          is_locked?: boolean
          is_pinned?: boolean
          title?: string
          updated_at?: string
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_academy: {
        Row: {
          category: string
          certification_available: boolean | null
          content: string
          created_at: string
          description: string | null
          difficulty: string
          duration: number
          id: string
          image_url: string | null
          instructor_id: string | null
          is_featured: boolean | null
          prerequisites: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          certification_available?: boolean | null
          content: string
          created_at?: string
          description?: string | null
          difficulty: string
          duration: number
          id?: string
          image_url?: string | null
          instructor_id?: string | null
          is_featured?: boolean | null
          prerequisites?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          certification_available?: boolean | null
          content?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          duration?: number
          id?: string
          image_url?: string | null
          instructor_id?: string | null
          is_featured?: boolean | null
          prerequisites?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_academy_certifications: {
        Row: {
          certificate_id: string
          course_id: string
          id: string
          issued_at: string
          metadata: Json | null
          status: string | null
          user_id: string
        }
        Insert: {
          certificate_id: string
          course_id: string
          id?: string
          issued_at?: string
          metadata?: Json | null
          status?: string | null
          user_id: string
        }
        Update: {
          certificate_id?: string
          course_id?: string
          id?: string
          issued_at?: string
          metadata?: Json | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_academy_certifications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "learning_academy"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_academy_progress: {
        Row: {
          completed: boolean | null
          completion_percent: number | null
          course_id: string
          created_at: string
          id: string
          last_accessed: string | null
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completion_percent?: number | null
          course_id: string
          created_at?: string
          id?: string
          last_accessed?: string | null
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completion_percent?: number | null
          course_id?: string
          created_at?: string
          id?: string
          last_accessed?: string | null
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_academy_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "learning_academy"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_content: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string | null
          difficulty: string
          duration: number
          id: string
          image_url: string | null
          required_tier: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description?: string | null
          difficulty: string
          duration: number
          id?: string
          image_url?: string | null
          required_tier: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          duration?: number
          id?: string
          image_url?: string | null
          required_tier?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          tier: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          tier?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          tier?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      study_group_members: {
        Row: {
          group_id: string
          joined_at: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          category: string
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          badge_description: string | null
          badge_name: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_description?: string | null
          badge_name: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_description?: string | null
          badge_name?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completion_percent: number | null
          course_id: number
          id: string
          last_accessed: string | null
          user_id: string
        }
        Insert: {
          completion_percent?: number | null
          course_id: number
          id?: string
          last_accessed?: string | null
          user_id: string
        }
        Update: {
          completion_percent?: number | null
          course_id?: number
          id?: string
          last_accessed?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_xp: {
        Row: {
          current_level: string | null
          last_updated: string | null
          total_xp: number | null
          user_id: string
        }
        Insert: {
          current_level?: string | null
          last_updated?: string | null
          total_xp?: number | null
          user_id: string
        }
        Update: {
          current_level?: string | null
          last_updated?: string | null
          total_xp?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_pro_features: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      get_user_tier: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      increment_ai_stream_views: {
        Args: {
          stream_id: string
        }
        Returns: undefined
      }
      toggle_ai_stream_like: {
        Args: {
          stream_id: string
          is_liked: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
