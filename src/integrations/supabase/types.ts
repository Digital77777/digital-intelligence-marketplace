export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_chat_messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "ai_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chats: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          artifact_url: string | null
          config: Json | null
          created_at: string
          description: string | null
          hyperparameters: Json | null
          id: string
          metrics: Json | null
          model_type: Database["public"]["Enums"]["dataset_type"]
          name: string
          status: Database["public"]["Enums"]["model_status"]
          template_id: string | null
          trained_at: string | null
          updated_at: string
          user_id: string
          version: string
        }
        Insert: {
          artifact_url?: string | null
          config?: Json | null
          created_at?: string
          description?: string | null
          hyperparameters?: Json | null
          id?: string
          metrics?: Json | null
          model_type: Database["public"]["Enums"]["dataset_type"]
          name: string
          status?: Database["public"]["Enums"]["model_status"]
          template_id?: string | null
          trained_at?: string | null
          updated_at?: string
          user_id: string
          version?: string
        }
        Update: {
          artifact_url?: string | null
          config?: Json | null
          created_at?: string
          description?: string | null
          hyperparameters?: Json | null
          id?: string
          metrics?: Json | null
          model_type?: Database["public"]["Enums"]["dataset_type"]
          name?: string
          status?: Database["public"]["Enums"]["model_status"]
          template_id?: string | null
          trained_at?: string | null
          updated_at?: string
          user_id?: string
          version?: string
        }
        Relationships: []
      }
      ai_streams: {
        Row: {
          id: string
          output: string | null
          task_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          output?: string | null
          task_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          output?: string | null
          task_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_tool_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_reviews_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tools: {
        Row: {
          category: string
          created_at: string | null
          description: string
          icon_url: string | null
          id: string
          name: string
          tags: string[] | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          icon_url?: string | null
          id?: string
          name: string
          tags?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
          tags?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      business_insights: {
        Row: {
          category: string
          content: string
          date: string
          id: string
          image_url: string | null
          is_premium: boolean
          source: string
          summary: string
          title: string
          trend_direction: string | null
          trend_percentage: number | null
          user_id: string
        }
        Insert: {
          category: string
          content: string
          date?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean
          source: string
          summary: string
          title: string
          trend_direction?: string | null
          trend_percentage?: number | null
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          date?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean
          source?: string
          summary?: string
          title?: string
          trend_direction?: string | null
          trend_percentage?: number | null
          user_id?: string
        }
        Relationships: []
      }
      cash_conversion_requests: {
        Row: {
          cash_amount: number
          id: string
          payment_details: Json | null
          payment_method: string | null
          processed_at: string | null
          requested_at: string
          status: string
          token_amount: number
          user_id: string
        }
        Insert: {
          cash_amount: number
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          requested_at?: string
          status?: string
          token_amount: number
          user_id: string
        }
        Update: {
          cash_amount?: number
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          requested_at?: string
          status?: string
          token_amount?: number
          user_id?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          badge_image: string
          created_at: string
          description: string
          expiration_period: number | null
          id: string
          is_industry_recognized: boolean
          required_tier: string
          requirements: string[]
          title: string
        }
        Insert: {
          badge_image: string
          created_at?: string
          description: string
          expiration_period?: number | null
          id?: string
          is_industry_recognized: boolean
          required_tier: string
          requirements: string[]
          title: string
        }
        Update: {
          badge_image?: string
          created_at?: string
          description?: string
          expiration_period?: number | null
          id?: string
          is_industry_recognized?: boolean
          required_tier?: string
          requirements?: string[]
          title?: string
        }
        Relationships: []
      }
      compliance_issues: {
        Row: {
          created_at: string
          description: string | null
          detected_date: string
          id: string
          regulation_type: Database["public"]["Enums"]["regulation_type"]
          risk_level: Database["public"]["Enums"]["risk_level"]
          scan_id: string | null
          status: Database["public"]["Enums"]["issue_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          detected_date?: string
          id?: string
          regulation_type: Database["public"]["Enums"]["regulation_type"]
          risk_level: Database["public"]["Enums"]["risk_level"]
          scan_id?: string | null
          status?: Database["public"]["Enums"]["issue_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          detected_date?: string
          id?: string
          regulation_type?: Database["public"]["Enums"]["regulation_type"]
          risk_level?: Database["public"]["Enums"]["risk_level"]
          scan_id?: string | null
          status?: Database["public"]["Enums"]["issue_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_issues_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "compliance_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_scans: {
        Row: {
          created_at: string
          id: string
          issues_detected: number
          last_scan_date: string
          regulation_type: Database["public"]["Enums"]["regulation_type"]
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          issues_detected?: number
          last_scan_date?: string
          regulation_type: Database["public"]["Enums"]["regulation_type"]
          score: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          issues_detected?: number
          last_scan_date?: string
          regulation_type?: Database["public"]["Enums"]["regulation_type"]
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      course_feedback: {
        Row: {
          comment: string | null
          course_id: number
          created_at: string
          id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          course_id: number
          created_at?: string
          id?: string
          rating?: number | null
          user_id: string
        }
        Update: {
          comment?: string | null
          course_id?: number
          created_at?: string
          id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      datasets: {
        Row: {
          created_at: string
          dataset_type: Database["public"]["Enums"]["dataset_type"]
          description: string | null
          file_format: string | null
          file_size: number | null
          file_url: string
          id: string
          metadata: Json | null
          name: string
          updated_at: string
          user_id: string
          validation_results: Json | null
        }
        Insert: {
          created_at?: string
          dataset_type: Database["public"]["Enums"]["dataset_type"]
          description?: string | null
          file_format?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          metadata?: Json | null
          name: string
          updated_at?: string
          user_id: string
          validation_results?: Json | null
        }
        Update: {
          created_at?: string
          dataset_type?: Database["public"]["Enums"]["dataset_type"]
          description?: string | null
          file_format?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          metadata?: Json | null
          name?: string
          updated_at?: string
          user_id?: string
          validation_results?: Json | null
        }
        Relationships: []
      }
      deployments: {
        Row: {
          api_key: string | null
          created_at: string
          deployed_at: string | null
          endpoint_url: string | null
          health_status: Json | null
          id: string
          model_id: string
          resource_config: Json | null
          status: Database["public"]["Enums"]["deployment_status"]
          updated_at: string
          usage_stats: Json | null
          user_id: string
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          deployed_at?: string | null
          endpoint_url?: string | null
          health_status?: Json | null
          id?: string
          model_id: string
          resource_config?: Json | null
          status?: Database["public"]["Enums"]["deployment_status"]
          updated_at?: string
          usage_stats?: Json | null
          user_id: string
        }
        Update: {
          api_key?: string | null
          created_at?: string
          deployed_at?: string | null
          endpoint_url?: string | null
          health_status?: Json | null
          id?: string
          model_id?: string
          resource_config?: Json | null
          status?: Database["public"]["Enums"]["deployment_status"]
          updated_at?: string
          usage_stats?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deployments_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          author_id: string
          content: string
          created_at: string
          discussion_type: Database["public"]["Enums"]["discussion_type"]
          id: string
          is_pinned: boolean
          mentions: Json | null
          parent_id: string | null
          reply_count: number
          team_id: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          discussion_type?: Database["public"]["Enums"]["discussion_type"]
          id?: string
          is_pinned?: boolean
          mentions?: Json | null
          parent_id?: string | null
          reply_count?: number
          team_id?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          discussion_type?: Database["public"]["Enums"]["discussion_type"]
          id?: string
          is_pinned?: boolean
          mentions?: Json | null
          parent_id?: string | null
          reply_count?: number
          team_id?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      earnings: {
        Row: {
          amount: number
          created_at: string
          earning_type: string
          id: string
          user_id: string
          vlog_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          earning_type: string
          id?: string
          user_id: string
          vlog_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          earning_type?: string
          id?: string
          user_id?: string
          vlog_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "earnings_vlog_id_fkey"
            columns: ["vlog_id"]
            isOneToOne: false
            referencedRelation: "vlogs"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          milestone_description: string | null
          payee_id: string
          payer_id: string
          platform_fee: number
          project_id: string
          released_at: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          milestone_description?: string | null
          payee_id: string
          payer_id: string
          platform_fee: number
          project_id: string
          released_at?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          milestone_description?: string | null
          payee_id?: string
          payer_id?: string
          platform_fee?: number
          project_id?: string
          released_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escrow_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "marketplace_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          tool_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          tool_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          tool_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      file_attachments: {
        Row: {
          attached_at: string
          discussion_id: string
          file_id: string
          id: string
        }
        Insert: {
          attached_at?: string
          discussion_id: string
          file_id: string
          id?: string
        }
        Update: {
          attached_at?: string
          discussion_id?: string
          file_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_attachments_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "file_attachments_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          download_count: number
          file_type: Database["public"]["Enums"]["file_type"]
          id: string
          is_public: boolean
          mime_type: string
          name: string
          original_name: string
          size_bytes: number
          storage_path: string
          team_id: string | null
          thumbnail_path: string | null
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          download_count?: number
          file_type?: Database["public"]["Enums"]["file_type"]
          id?: string
          is_public?: boolean
          mime_type: string
          name: string
          original_name: string
          size_bytes: number
          storage_path: string
          team_id?: string | null
          thumbnail_path?: string | null
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          download_count?: number
          file_type?: Database["public"]["Enums"]["file_type"]
          id?: string
          is_public?: boolean
          mime_type?: string
          name?: string
          original_name?: string
          size_bytes?: number
          storage_path?: string
          team_id?: string | null
          thumbnail_path?: string | null
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
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
          description: string
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
          description: string
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
          description?: string
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
          is_public: boolean
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
          is_public?: boolean
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
          is_public?: boolean
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
      freelancer_profiles: {
        Row: {
          average_rating: number | null
          badge: Database["public"]["Enums"]["freelancer_badge"] | null
          bio: string | null
          created_at: string | null
          github_url: string | null
          hourly_rate: number | null
          id: string
          is_featured: boolean | null
          is_verified: boolean | null
          kaggle_url: string | null
          portfolio_url: string | null
          skills: string[] | null
          success_rate: number | null
          total_earnings: number | null
          total_projects: number | null
          updated_at: string | null
          user_id: string
          years_experience: number | null
        }
        Insert: {
          average_rating?: number | null
          badge?: Database["public"]["Enums"]["freelancer_badge"] | null
          bio?: string | null
          created_at?: string | null
          github_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          kaggle_url?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          success_rate?: number | null
          total_earnings?: number | null
          total_projects?: number | null
          updated_at?: string | null
          user_id: string
          years_experience?: number | null
        }
        Update: {
          average_rating?: number | null
          badge?: Database["public"]["Enums"]["freelancer_badge"] | null
          bio?: string | null
          created_at?: string | null
          github_url?: string | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          is_verified?: boolean | null
          kaggle_url?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          success_rate?: number | null
          total_earnings?: number | null
          total_projects?: number | null
          updated_at?: string | null
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      insights_data: {
        Row: {
          category: string
          date: string
          id: string
          meta: Json | null
          timestamp: string
          type: string
          value: number
        }
        Insert: {
          category: string
          date?: string
          id?: string
          meta?: Json | null
          timestamp?: string
          type: string
          value: number
        }
        Update: {
          category?: string
          date?: string
          id?: string
          meta?: Json | null
          timestamp?: string
          type?: string
          value?: number
        }
        Relationships: []
      }
      learning_courses: {
        Row: {
          category: string
          certification_available: boolean | null
          content: string | null
          created_at: string
          description: string | null
          difficulty: string
          duration: number
          id: string
          image_url: string | null
          instructor: string | null
          is_featured: boolean | null
          prerequisites: string[] | null
          required_tier: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          certification_available?: boolean | null
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty: string
          duration: number
          id?: string
          image_url?: string | null
          instructor?: string | null
          is_featured?: boolean | null
          prerequisites?: string[] | null
          required_tier?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          certification_available?: boolean | null
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          duration?: number
          id?: string
          image_url?: string | null
          instructor?: string | null
          is_featured?: boolean | null
          prerequisites?: string[] | null
          required_tier?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      learning_feedback: {
        Row: {
          comment: string | null
          course_id: string
          created_at: string
          id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          course_id: string
          created_at?: string
          id?: string
          rating?: number | null
          user_id: string
        }
        Update: {
          comment?: string | null
          course_id?: string
          created_at?: string
          id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_feedback_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "learning_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_modules: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          quiz_data: Json | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          quiz_data?: Json | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          quiz_data?: Json | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      learning_paths: {
        Row: {
          badge_name: string | null
          category: string
          courses: string[]
          created_at: string
          description: string
          difficulty: string
          id: string
          image_url: string | null
          required_tier: string
          title: string
          total_duration: number
        }
        Insert: {
          badge_name?: string | null
          category: string
          courses: string[]
          created_at?: string
          description: string
          difficulty: string
          id?: string
          image_url?: string | null
          required_tier: string
          title: string
          total_duration: number
        }
        Update: {
          badge_name?: string | null
          category?: string
          courses?: string[]
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          image_url?: string | null
          required_tier?: string
          title?: string
          total_duration?: number
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          completed: boolean
          completion_percent: number
          course_id: string
          created_at: string
          id: string
          last_accessed: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completion_percent?: number
          course_id: string
          created_at?: string
          id?: string
          last_accessed?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completion_percent?: number
          course_id?: string
          created_at?: string
          id?: string
          last_accessed?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "learning_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: string
          user_id: string
          vlog_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
          vlog_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          vlog_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_vlog_id_fkey"
            columns: ["vlog_id"]
            isOneToOne: false
            referencedRelation: "vlogs"
            referencedColumns: ["id"]
          },
        ]
      }
      live_events: {
        Row: {
          datetime: string
          description: string
          duration: number
          event_type: string
          host_name: string
          id: string
          image_url: string | null
          max_participants: number | null
          registration_deadline: string | null
          required_tier: string
          title: string
        }
        Insert: {
          datetime: string
          description: string
          duration: number
          event_type: string
          host_name: string
          id?: string
          image_url?: string | null
          max_participants?: number | null
          registration_deadline?: string | null
          required_tier: string
          title: string
        }
        Update: {
          datetime?: string
          description?: string
          duration?: number
          event_type?: string
          host_name?: string
          id?: string
          image_url?: string | null
          max_participants?: number | null
          registration_deadline?: string | null
          required_tier?: string
          title?: string
        }
        Relationships: []
      }
      marketplace_items: {
        Row: {
          created_at: string | null
          description: string
          file_url: string | null
          id: string
          license: string | null
          price: number
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          file_url?: string | null
          id?: string
          license?: string | null
          price: number
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          file_url?: string | null
          id?: string
          license?: string | null
          price?: number
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      marketplace_projects: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          client_id: string
          created_at: string | null
          deadline: string | null
          description: string
          estimated_hours: number | null
          experience_level: Database["public"]["Enums"]["skill_level"] | null
          featured_until: string | null
          fixed_price: number | null
          freelancer_id: string | null
          id: string
          is_hourly: boolean | null
          project_type: Database["public"]["Enums"]["project_type"]
          required_skills: string[] | null
          status: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at: string | null
          urgency_level: number | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          client_id: string
          created_at?: string | null
          deadline?: string | null
          description: string
          estimated_hours?: number | null
          experience_level?: Database["public"]["Enums"]["skill_level"] | null
          featured_until?: string | null
          fixed_price?: number | null
          freelancer_id?: string | null
          id?: string
          is_hourly?: boolean | null
          project_type: Database["public"]["Enums"]["project_type"]
          required_skills?: string[] | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title: string
          updated_at?: string | null
          urgency_level?: number | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          client_id?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          estimated_hours?: number | null
          experience_level?: Database["public"]["Enums"]["skill_level"] | null
          featured_until?: string | null
          fixed_price?: number | null
          freelancer_id?: string | null
          id?: string
          is_hourly?: boolean | null
          project_type?: Database["public"]["Enums"]["project_type"]
          required_skills?: string[] | null
          status?: Database["public"]["Enums"]["project_status"] | null
          title?: string
          updated_at?: string | null
          urgency_level?: number | null
        }
        Relationships: []
      }
      marketplace_services: {
        Row: {
          average_rating: number | null
          category: string | null
          created_at: string
          delivery_time_days: number | null
          description: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          price: number
          seller_id: string
          tags: string[] | null
          title: string
          total_reviews: number | null
        }
        Insert: {
          average_rating?: number | null
          category?: string | null
          created_at?: string
          delivery_time_days?: number | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          price: number
          seller_id: string
          tags?: string[] | null
          title: string
          total_reviews?: number | null
        }
        Update: {
          average_rating?: number | null
          category?: string | null
          created_at?: string
          delivery_time_days?: number | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          price?: number
          seller_id?: string
          tags?: string[] | null
          title?: string
          total_reviews?: number | null
        }
        Relationships: []
      }
      marketplace_tool_submissions: {
        Row: {
          admin_notes: string | null
          category: string
          contact_info: string
          created_at: string
          detailed_description: string
          external_link: string
          id: string
          images: string[]
          pricing_model: string
          reviewed_at: string | null
          reviewed_by: string | null
          short_description: string
          status: string
          submitter_id: string
          tool_name: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          category: string
          contact_info: string
          created_at?: string
          detailed_description: string
          external_link: string
          id?: string
          images: string[]
          pricing_model: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          short_description: string
          status?: string
          submitter_id: string
          tool_name: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          category?: string
          contact_info?: string
          created_at?: string
          detailed_description?: string
          external_link?: string
          id?: string
          images?: string[]
          pricing_model?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          short_description?: string
          status?: string
          submitter_id?: string
          tool_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_tools: {
        Row: {
          api_documentation: string | null
          category: string
          created_at: string | null
          demo_url: string | null
          description: string
          downloads_count: number | null
          id: string
          is_featured: boolean | null
          is_subscription: boolean | null
          name: string
          price: number
          rating: number | null
          reviews_count: number | null
          seller_id: string
          subscription_period: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          api_documentation?: string | null
          category: string
          created_at?: string | null
          demo_url?: string | null
          description: string
          downloads_count?: number | null
          id?: string
          is_featured?: boolean | null
          is_subscription?: boolean | null
          name: string
          price: number
          rating?: number | null
          reviews_count?: number | null
          seller_id: string
          subscription_period?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          api_documentation?: string | null
          category?: string
          created_at?: string | null
          demo_url?: string | null
          description?: string
          downloads_count?: number | null
          id?: string
          is_featured?: boolean | null
          is_subscription?: boolean | null
          name?: string
          price?: number
          rating?: number | null
          reviews_count?: number | null
          seller_id?: string
          subscription_period?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      metric_snapshots: {
        Row: {
          active_users: number | null
          conversion_rate: number | null
          created_at: string
          customer_satisfaction: number | null
          id: string
          snapshot_date: string
          total_revenue: number | null
          user_id: string
        }
        Insert: {
          active_users?: number | null
          conversion_rate?: number | null
          created_at?: string
          customer_satisfaction?: number | null
          id?: string
          snapshot_date: string
          total_revenue?: number | null
          user_id: string
        }
        Update: {
          active_users?: number | null
          conversion_rate?: number | null
          created_at?: string
          customer_satisfaction?: number | null
          id?: string
          snapshot_date?: string
          total_revenue?: number | null
          user_id?: string
        }
        Relationships: []
      }
      model_metrics: {
        Row: {
          epoch: number | null
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number
          model_id: string
          timestamp: string
          training_job_id: string | null
        }
        Insert: {
          epoch?: number | null
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value: number
          model_id: string
          timestamp?: string
          training_job_id?: string | null
        }
        Update: {
          epoch?: number | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          model_id?: string
          timestamp?: string
          training_job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_metrics_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_metrics_training_job_id_fkey"
            columns: ["training_job_id"]
            isOneToOne: false
            referencedRelation: "training_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      model_templates: {
        Row: {
          created_at: string
          default_config: Json
          description: string | null
          id: string
          is_active: boolean | null
          model_type: Database["public"]["Enums"]["dataset_type"]
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_config: Json
          description?: string | null
          id?: string
          is_active?: boolean | null
          model_type: Database["public"]["Enums"]["dataset_type"]
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_config?: Json
          description?: string | null
          id?: string
          is_active?: boolean | null
          model_type?: Database["public"]["Enums"]["dataset_type"]
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          change_period: string | null
          change_value: number | null
          id: string
          metric_name: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          change_period?: string | null
          change_value?: number | null
          id?: string
          metric_name: string
          updated_at?: string
          user_id: string
          value: number
        }
        Update: {
          change_period?: string | null
          change_value?: number | null
          id?: string
          metric_name?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      pipeline_deals: {
        Row: {
          assigned_to: string | null
          contact_info: Json | null
          created_at: string
          expected_close_date: string | null
          id: string
          notes: string | null
          pipeline_id: string | null
          probability: number | null
          stage: string
          title: string
          updated_at: string
          value: number | null
        }
        Insert: {
          assigned_to?: string | null
          contact_info?: Json | null
          created_at?: string
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          pipeline_id?: string | null
          probability?: number | null
          stage: string
          title: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          assigned_to?: string | null
          contact_info?: Json | null
          created_at?: string
          expected_close_date?: string | null
          id?: string
          notes?: string | null
          pipeline_id?: string | null
          probability?: number | null
          stage?: string
          title?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_deals_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      pipelines: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          owner_id: string | null
          stages: Json
          status: string
          team_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          owner_id?: string | null
          stages?: Json
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          stages?: Json
          status?: string
          team_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipelines_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cash_balance: number | null
          created_at: string
          display_name: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          pending_earnings: number | null
          revenue: number | null
          tier: string | null
          token_balance: number | null
          total_earnings: number | null
          total_likes: number | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          cash_balance?: number | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id: string
          pending_earnings?: number | null
          revenue?: number | null
          tier?: string | null
          token_balance?: number | null
          total_earnings?: number | null
          total_likes?: number | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          cash_balance?: number | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          pending_earnings?: number | null
          revenue?: number | null
          tier?: string | null
          token_balance?: number | null
          total_earnings?: number | null
          total_likes?: number | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      project_proposals: {
        Row: {
          cover_letter: string
          freelancer_id: string
          id: string
          is_accepted: boolean | null
          project_id: string
          proposed_amount: number
          proposed_timeline: number | null
          submitted_at: string | null
        }
        Insert: {
          cover_letter: string
          freelancer_id: string
          id?: string
          is_accepted?: boolean | null
          project_id: string
          proposed_amount: number
          proposed_timeline?: number | null
          submitted_at?: string | null
        }
        Update: {
          cover_letter?: string
          freelancer_id?: string
          id?: string
          is_accepted?: boolean | null
          project_id?: string
          proposed_amount?: number
          proposed_timeline?: number | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_proposals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "marketplace_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_reviews: {
        Row: {
          communication_rating: number | null
          created_at: string | null
          id: string
          project_id: string
          quality_rating: number | null
          rating: number
          review_text: string | null
          reviewee_id: string
          reviewer_id: string
          timeliness_rating: number | null
        }
        Insert: {
          communication_rating?: number | null
          created_at?: string | null
          id?: string
          project_id: string
          quality_rating?: number | null
          rating: number
          review_text?: string | null
          reviewee_id: string
          reviewer_id: string
          timeliness_rating?: number | null
        }
        Update: {
          communication_rating?: number | null
          created_at?: string | null
          id?: string
          project_id?: string
          quality_rating?: number | null
          rating?: number
          review_text?: string | null
          reviewee_id?: string
          reviewer_id?: string
          timeliness_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_reviews_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "marketplace_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          team_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          team_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          team_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: Database["public"]["Enums"]["task_status"]
          team_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          team_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          team_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_activity: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          team_id: string
          user_id: string
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          team_id: string
          user_id: string
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_activity_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invites: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          declined_at: string | null
          email: string
          id: string
          invited_by: string | null
          status: string
          team_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          declined_at?: string | null
          email: string
          id?: string
          invited_by?: string | null
          status?: string
          team_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          declined_at?: string | null
          email?: string
          id?: string
          invited_by?: string | null
          status?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_invites_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_memberships: {
        Row: {
          id: string
          joined_at: string
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_memberships_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          cash_amount: number | null
          created_at: string
          description: string | null
          id: string
          token_amount: number
          transaction_type: string
          user_id: string
        }
        Insert: {
          cash_amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          token_amount: number
          transaction_type: string
          user_id: string
        }
        Update: {
          cash_amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          token_amount?: number
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      tool_reviews: {
        Row: {
          created_at: string | null
          id: string
          rating: number
          review_text: string | null
          reviewer_id: string
          tool_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          rating: number
          review_text?: string | null
          reviewer_id: string
          tool_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          rating?: number
          review_text?: string | null
          reviewer_id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_reviews_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "marketplace_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      training_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          current_epoch: number | null
          dataset_id: string | null
          error_message: string | null
          id: string
          logs: Json | null
          metrics: Json | null
          model_id: string
          progress_percentage: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["training_status"]
          total_epochs: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_epoch?: number | null
          dataset_id?: string | null
          error_message?: string | null
          id?: string
          logs?: Json | null
          metrics?: Json | null
          model_id: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          total_epochs?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_epoch?: number | null
          dataset_id?: string | null
          error_message?: string | null
          id?: string
          logs?: Json | null
          metrics?: Json | null
          model_id?: string
          progress_percentage?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["training_status"]
          total_epochs?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_jobs_dataset_id_fkey"
            columns: ["dataset_id"]
            isOneToOne: false
            referencedRelation: "datasets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_jobs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          item_id: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          item_id?: string | null
          status: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          item_id?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          module_id: string | null
          progress_percentage: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress_percentage?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress_percentage?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_streams: {
        Row: {
          category: string
          code_snippets: Json | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          is_flagged: boolean
          is_public: boolean
          status: Database["public"]["Enums"]["stream_status"]
          thumbnail_storage_path: string | null
          title: string
          updated_at: string
          user_id: string
          video_storage_path: string | null
          views: number
        }
        Insert: {
          category: string
          code_snippets?: Json | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_flagged?: boolean
          is_public?: boolean
          status?: Database["public"]["Enums"]["stream_status"]
          thumbnail_storage_path?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_storage_path?: string | null
          views?: number
        }
        Update: {
          category?: string
          code_snippets?: Json | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          is_flagged?: boolean
          is_public?: boolean
          status?: Database["public"]["Enums"]["stream_status"]
          thumbnail_storage_path?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_storage_path?: string | null
          views?: number
        }
        Relationships: []
      }
      vlog_views: {
        Row: {
          id: string
          user_id: string
          viewed_at: string
          vlog_id: string
        }
        Insert: {
          id?: string
          user_id: string
          viewed_at?: string
          vlog_id: string
        }
        Update: {
          id?: string
          user_id?: string
          viewed_at?: string
          vlog_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vlog_views_vlog_id_fkey"
            columns: ["vlog_id"]
            isOneToOne: false
            referencedRelation: "vlogs"
            referencedColumns: ["id"]
          },
        ]
      }
      vlogs: {
        Row: {
          caption: string | null
          comments_count: number | null
          created_at: string
          id: string
          likes_count: number | null
          shares_count: number | null
          thumbnail_url: string | null
          user_id: string
          video_url: string
        }
        Insert: {
          caption?: string | null
          comments_count?: number | null
          created_at?: string
          id?: string
          likes_count?: number | null
          shares_count?: number | null
          thumbnail_url?: string | null
          user_id: string
          video_url: string
        }
        Update: {
          caption?: string | null
          comments_count?: number | null
          created_at?: string
          id?: string
          likes_count?: number | null
          shares_count?: number | null
          thumbnail_url?: string | null
          user_id?: string
          video_url?: string
        }
        Relationships: []
      }
      workflow_execution_logs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          started_at: string | null
          status: string
          step_outputs: Json | null
          updated_at: string | null
          user_id: string
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          started_at?: string | null
          status: string
          step_outputs?: Json | null
          updated_at?: string | null
          user_id: string
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          started_at?: string | null
          status?: string
          step_outputs?: Json | null
          updated_at?: string | null
          user_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_execution_logs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_execution_metrics: {
        Row: {
          created_at: string | null
          execution_time_ms: number | null
          id: string
          log_id: string | null
          step_metrics: Json | null
          success: boolean | null
          workflow_id: string
        }
        Insert: {
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          log_id?: string | null
          step_metrics?: Json | null
          success?: boolean | null
          workflow_id: string
        }
        Update: {
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          log_id?: string | null
          step_metrics?: Json | null
          success?: boolean | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_execution_metrics_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "workflow_execution_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_execution_metrics_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_permissions: {
        Row: {
          granted_at: string | null
          id: string
          role: string
          user_id: string
          workflow_id: string
        }
        Insert: {
          granted_at?: string | null
          id?: string
          role?: string
          user_id: string
          workflow_id: string
        }
        Update: {
          granted_at?: string | null
          id?: string
          role?: string
          user_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_permissions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          status: string
          steps: Json
          team_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string
          steps?: Json
          team_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string
          steps?: Json
          team_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_compliance_score: {
        Args:
          | Record<PropertyKey, never>
          | {
              p_user_id: string
              p_regulation: Database["public"]["Enums"]["regulation_type"]
            }
        Returns: number
      }
      convert_tokens_to_cash: {
        Args: {
          p_user_id: string
          p_token_amount: number
          p_payment_method?: string
          p_payment_details?: Json
        }
        Returns: string
      }
      create_user_profile: {
        Args: { user_id: string; username: string; display_name: string }
        Returns: undefined
      }
      get_course_feedback: {
        Args: { p_course_id: string }
        Returns: {
          id: string
          user_id: string
          comment: string
          rating: number
          created_at: string
        }[]
      }
      get_my_team_ids: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_my_team_invites: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          team_id: string
          email: string
          status: string
          created_at: string
        }[]
      }
      get_my_teams: {
        Args: Record<PropertyKey, never>
        Returns: {
          team_id: string
        }[]
      }
      get_user_profile: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          username: string
          display_name: string
          avatar_url: string
          bio: string
          created_at: string
          updated_at: string
        }[]
      }
      get_user_tier: {
        Args: { p_user_id: string }
        Returns: string
      }
      get_workflow_runs_with_details: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          workflow_id: string
          workflow_name: string
          status: string
          duration: string
          start_time: string
          steps_count: number
          triggered_by: string
          error_message: string
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      run_compliance_scan: {
        Args: {
          p_user_id: string
          p_regulation: Database["public"]["Enums"]["regulation_type"]
        }
        Returns: string
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      app_role: "super_admin" | "user"
      dataset_type:
        | "text_classification"
        | "image_classification"
        | "regression"
        | "object_detection"
        | "nlp"
      deployment_status: "deploying" | "deployed" | "failed" | "stopped"
      discussion_type: "general" | "announcement" | "question" | "feedback"
      file_type: "document" | "image" | "video" | "archive" | "other"
      freelancer_badge: "bronze" | "silver" | "gold"
      issue_status: "Open" | "In Progress" | "Resolved"
      model_status:
        | "draft"
        | "training"
        | "trained"
        | "deployed"
        | "failed"
        | "archived"
      project_status:
        | "open"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "disputed"
      project_type: "service" | "tool" | "job"
      regulation_type: "GDPR" | "HIPAA" | "SOC2"
      risk_level: "Critical" | "High" | "Medium" | "Low"
      skill_level: "beginner" | "intermediate" | "advanced" | "expert"
      stream_status: "pending" | "processing" | "published" | "error"
      task_status: "todo" | "in_progress" | "completed"
      training_status:
        | "pending"
        | "running"
        | "completed"
        | "failed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "user"],
      dataset_type: [
        "text_classification",
        "image_classification",
        "regression",
        "object_detection",
        "nlp",
      ],
      deployment_status: ["deploying", "deployed", "failed", "stopped"],
      discussion_type: ["general", "announcement", "question", "feedback"],
      file_type: ["document", "image", "video", "archive", "other"],
      freelancer_badge: ["bronze", "silver", "gold"],
      issue_status: ["Open", "In Progress", "Resolved"],
      model_status: [
        "draft",
        "training",
        "trained",
        "deployed",
        "failed",
        "archived",
      ],
      project_status: [
        "open",
        "in_progress",
        "completed",
        "cancelled",
        "disputed",
      ],
      project_type: ["service", "tool", "job"],
      regulation_type: ["GDPR", "HIPAA", "SOC2"],
      risk_level: ["Critical", "High", "Medium", "Low"],
      skill_level: ["beginner", "intermediate", "advanced", "expert"],
      stream_status: ["pending", "processing", "published", "error"],
      task_status: ["todo", "in_progress", "completed"],
      training_status: [
        "pending",
        "running",
        "completed",
        "failed",
        "cancelled",
      ],
    },
  },
} as const
