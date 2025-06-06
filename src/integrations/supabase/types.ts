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
          created_at: string
          display_name: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          revenue: number | null
          tier: string | null
          total_likes: number | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id: string
          revenue?: number | null
          tier?: string | null
          total_likes?: number | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          revenue?: number | null
          tier?: string | null
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
          status: string
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
          status?: string
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
          status?: string
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
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role: string
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
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
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: string
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string
          role?: string
          team_id?: string | null
          user_id?: string | null
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
          full_name: string | null
          id: string
          tier: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          tier?: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          tier?: string
          updated_at?: string
          username?: string
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
        Args: {
          p_user_id: string
          p_regulation: Database["public"]["Enums"]["regulation_type"]
        }
        Returns: number
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
      freelancer_badge: "bronze" | "silver" | "gold"
      issue_status: "Open" | "In Progress" | "Resolved"
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
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      freelancer_badge: ["bronze", "silver", "gold"],
      issue_status: ["Open", "In Progress", "Resolved"],
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
    },
  },
} as const
